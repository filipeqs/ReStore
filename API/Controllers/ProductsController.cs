using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper _mapper;

    public ProductsController(StoreContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
    {
        var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

        var products = await PagedList<Product>.ToPagedList(query, 
            productParams.PageNumber, 
            productParams.PageSize);

        Response.AddPaginationHeader(products.MetaData);

        return Ok(products);
    }

    [HttpGet("{id}", Name = "GetProduct")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();

        return Ok(product);
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

        return Ok(new { brands, types });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productdto)
    {
        var product = _mapper.Map<Product>(productdto);
        _context.Products.Add(product);

        var result = await _context.SaveChangesAsync() > 0;

        if (result is false)
            return BadRequest(new ProblemDetails{ Title = "Problem creating a new product" });

        return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using myApp.API.DataAccess;
using myApp.API.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace myApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ArtShopController : ControllerBase
    {
        readonly IDataAccess dataAccess;
        private readonly string DateFormat;
        public ArtShopController(IDataAccess dataAccess, IConfiguration configuration)
        {
            this.dataAccess = dataAccess;
            DateFormat = configuration["Constants:DateFormat"];
        }

        [HttpGet("GetCategoryList")]
        public IActionResult GetCategoryList()
        {
            var result = dataAccess.GetItemCategories();
            return Ok(result);
        }

        [HttpGet("GetItems")]
        public IActionResult GetItems(string category, string artist, int count)
        {
            var result = dataAccess.GetItems(category, artist, count);
            return Ok(result);
        }

        [HttpGet("GetItem/{id}")]
        public IActionResult GetItem(int id)
        {
            var result = dataAccess.GetItem(id);
            return Ok(result);
        }
    }
}


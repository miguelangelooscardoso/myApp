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

        [HttpPost("RegisterUser")]
        public IActionResult RegisterUser([FromBody] User user)
        {
            user.CreatedAt = DateTime.Now.ToString(DateFormat);
            user.ModifiedAt = DateTime.Now.ToString(DateFormat);

            var result = dataAccess.InsertUser(user);

            string? message;
            if (result) message = "inserted";
            else message = "email not available";
            return Ok(message);
        }

        [HttpPost("LoginUser")]
        public IActionResult LoginUser([FromBody] User user)
        {
            var token = dataAccess.IsUserPresent(user.Email, user.Password);
            if (token == "") token = "invalid";
            return Ok(token);
        }

        [HttpPost("InsertFeedback")]
        public IActionResult InsertFeedback([FromBody] Feedback feedback)
        {
            feedback.CreatedAt = DateTime.Now.ToString(DateFormat);
            dataAccess.InsertFeedback(feedback);
            return Ok("inserted");
        }

        [HttpGet("GetItemFeedbacks/{itemId}")]
        public IActionResult GetItemFeedbacks(int itemId)
        {
            var result = dataAccess.GetItemFeedbacks(itemId);
            return Ok(result);
        }

        [HttpPost("InsertCartItem/{userId}/{itemId}")]
        public IActionResult InsertCartItem(int userid, int itemid)
        {
            var result = dataAccess.InsertCartItem(userid, itemid);
            return Ok(result ? "insert" : "not inserted");
        }

        [HttpGet("GetActiveCartOfUser/{id}")]
        public IActionResult GetActiveCartOfUser(int id)
        {
            var result = dataAccess.GetActiveCartOfUser(id);
            return Ok(result);
        }

        [HttpGet("GetAllPreviousCartsOfUser/{id}")]
        public IActionResult GetAllPreviousCartsOfUser(int id)
        {
            var result = dataAccess.GetAllPreviousCartsOfUser(id);
            return Ok(result);
        }
    }
}




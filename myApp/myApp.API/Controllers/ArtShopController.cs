﻿using System;
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

        [HttpPost("AddCategory")]
        public IActionResult AddCategory([FromBody] ItemCategory category)
        {
            try
            {
                dataAccess.InsertItemCategory(category);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add category: {ex.Message}");
            }
        }

        [HttpDelete("DeleteCategory/{categoryId}")]
        public IActionResult DeleteCategory(int categoryId)
        {
            try
            {
                dataAccess.DeleteItemCategory(categoryId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to delete category: {ex.Message}");
            }
        }

        [HttpGet("GetItems")]
        public IActionResult GetItems(string category, string artist, int count)
        {
            var result = dataAccess.GetItems(category, artist, count);
            return Ok(result);
        }

        [HttpGet("GetAllItems")]
        public IActionResult GetAllItems()
        {
            var result = dataAccess.GetAllItems();
            return Ok(result);
        }

        [HttpPost("InsertItem")]
        public IActionResult InsertItem([FromBody] Item newItem)
        {
            if (newItem == null)
            {
                return BadRequest("The request body must contain a 'newItem' field.");
            }

            // Add the new item to the database
            try
            {
                dataAccess.InsertItem(newItem);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            // Return a success response
            return Ok();
        }

        [HttpDelete("DeleteItem/{id}")]
        public IActionResult DeleteItem(int id)
        {
            try
            {
                dataAccess.DeleteItem(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpGet("GetAllOffers")]
        public IActionResult GetAllOffers()
        {
            var result = dataAccess.GetAllOffers();
            return Ok(result);
        }

        [HttpPost("AddOffer")]
        public IActionResult AddOffer([FromBody] Offer offer)
        {
            try
            {
                dataAccess.InsertOffer(offer);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("RemoveOffer/{offerId}")]
        public IActionResult RemoveOffer(int offerId)
        {
            try
            {
                dataAccess.RemoveOffer(offerId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("GetItemsByCategory")]
        public IActionResult GetItemsByCategory(string category, string artist)
        {
            var result = dataAccess.GetItemsByCategory(category, artist);
            return Ok(result);
        }

        [HttpGet("GetItem/{id}")]
        public IActionResult GetItem(int id)
        {
            var result = dataAccess.GetItem(id);
            return Ok(result);
        }

        //[HttpPost("RegisterUser")]
        //public IActionResult RegisterUser([FromBody] User user)
        //{
        //    user.CreatedAt = DateTime.Now.ToString(DateFormat);
        //    user.ModifiedAt = DateTime.Now.ToString(DateFormat);

        //    var result = dataAccess.InsertUser(user);

        //    string? message;
        //    if (result) message = "inserted";
        //    else message = "email not available";
        //    return Ok(message);
        //}

        //[HttpPost("LoginUser")]
        //public IActionResult LoginUser([FromBody] User user)
        //{
        //    var token = dataAccess.IsUserPresent(user.Email, user.Password);
        //    if (token == "") token = "invalid";
        //    return Ok(token);
        //}

        //[HttpPost("InsertFeedback")]
        //public IActionResult InsertFeedback([FromBody] Feedback feedback)
        //{
        //    feedback.CreatedAt = DateTime.Now.ToString(DateFormat);
        //    dataAccess.InsertFeedback(feedback);
        //    return Ok("inserted");
        //}

        [HttpPost("InsertFeedback")]
        public IActionResult InsertFeedback(int userId, int itemId, string feedbackValue)
        {
            string createdAt = DateTime.Now.ToString(DateFormat);
            dataAccess.InsertFeedback(userId, itemId, feedbackValue, createdAt);
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

        [HttpDelete("RemoveCartItem/{userId}/{itemId}")]
        public IActionResult RemoveCartItem(int userId, int itemId)
        {
            var result = dataAccess.RemoveCartItem(userId, itemId);
            return Ok(result ? "removed" : "not removed");
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

        [HttpGet("GetPaymentMethods")]
        public IActionResult GetPaymentMethods()
        {
            var result = dataAccess.GetPaymentMethods();
            return Ok(result);
        }

        [HttpPost("InsertPayment")]
        public IActionResult InsertPayment(Payment payment)
        {
            payment.CreatedAt = DateTime.Now.ToString();
            var id = dataAccess.InsertPayment(payment);
            return Ok(id.ToString());
        }

        [HttpPost("InsertOrder")]
        public IActionResult InsertOrder(Order order)
        {
            order.CreatedAt = DateTime.Now.ToString();
            var id = dataAccess.InsertOrder(order);
            return Ok(id.ToString());
        }

    }
}




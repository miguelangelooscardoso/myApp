using System;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.IdentityModel.Tokens;
using myApp.API.Models;

namespace myApp.API.DataAccess
{
    public class DataAccess : IDataAccess
    {
        private readonly IConfiguration configuration;
        private readonly string dbconnection;
        private readonly string dateformat;

        public DataAccess(IConfiguration configuration)
        {
            this.configuration = configuration;
            dbconnection = this.configuration["ConnectionStrings:DB"];
            dateformat = this.configuration["Constants:DateFormat"];
        }

        public Offer GetOffer(int id)
        {
            var offer = new Offer();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = "SELECT * FROM Offers WHERE OfferId=" + id + ";";
                command.CommandText = query;

                connection.Open();
                SqlDataReader r = command.ExecuteReader();
                while (r.Read())
                {
                    offer.Id = (int)r["OfferID"];
                    offer.Title = (string)r["Title"];
                    offer.Discount = (int)r["Discount"];
                }
            }
            return offer;
        }

        public List<ItemCategory> GetItemCategories()
        {
            var itemCategories = new List<ItemCategory>();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };
                string query = "SELECT * FROM ItemCategories;";
                command.CommandText = query;

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var category = new ItemCategory()
                    {
                        Id = (int)reader["CategoryId"],
                        Category = (string)reader["Category"],
                        Artist = (string)reader["Artist"]
                    };
                    itemCategories.Add(category);
                }
            }
            return itemCategories;
        }

        // Query where Related Items fail
        public ItemCategory GetItemCategory(int id)
        {
            var itemCategory = new ItemCategory();

            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = "SELECT * FROM ItemCategories WHERE CategoryId=" + id + ";";
                command.CommandText = query;

                connection.Open();
                SqlDataReader r = command.ExecuteReader();
                while (r.Read())
                {
                    itemCategory.Id = (int)r["CategoryId"];
                    itemCategory.Category = (string)r["Category"];
                    itemCategory.Artist = (string)r["Artist"];
                }
            }
            return itemCategory;
        }

        public List<Item> GetItems(string category, string artist, int count)
        {
            var items = new List<Item>();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = "SELECT TOP " + count + " * FROM Items WHERE CategoryId=(SELECT CategoryId FROM ItemCategories WHERE Category=@c AND Artist=@s) ORDER BY newid();";
                command.CommandText = query;
                command.Parameters.Add("@c", System.Data.SqlDbType.NVarChar).Value = category;
                command.Parameters.Add("@s", System.Data.SqlDbType.NVarChar).Value = artist;

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var item = new Item()
                    {
                        Id = (int)reader["ItemId"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"],
                        Price = (double)reader["Price"],
                        Quantity = (int)reader["Quantity"],
                        ImageName = (string)reader["ImageName"]
                    };

                    var categoryid = (int)reader["CategoryId"];
                    item.ItemCategory = GetItemCategory(categoryid);

                    var offerid = (int)reader["OfferId"];
                    item.Offer = GetOffer(offerid);

                    items.Add(item);
                }
            }
            return items;
        }

        public Item GetItem(int id)
        {
            var item = new Item();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = "SELECT * FROM Items WHERE ItemId=" + id + ";";
                command.CommandText = query;

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    item.Id = (int)reader["ItemId"];
                    item.Title = (string)reader["Title"];
                    item.Description = (string)reader["Description"];
                    item.Price = (double)reader["Price"];
                    item.Quantity = (int)reader["Quantity"];
                    item.ImageName = (string)reader["ImageName"];

                    var categoryid = (int)reader["CategoryId"];
                    item.ItemCategory = GetItemCategory(categoryid);

                    var offerid = (int)reader["OfferId"];
                    item.Offer = GetOffer(offerid);
                }
            }
            return item;
        }

        //public bool InsertUser(User user)
        //{
        //    using (SqlConnection connection = new(dbconnection))
        //    {
        //        SqlCommand command = new()
        //        {
        //            Connection = connection
        //        };
        //        connection.Open();

        //        string query = "SELECT COUNT(*) FROM Users WHERE Email='" + user.Email + "';";
        //        command.CommandText = query;
        //        int count = (int)command.ExecuteScalar();
        //        if (count > 0)
        //        {
        //            connection.Close();
        //            return false;
        //        }

        //        query = "INSERT INTO Users (FirstName, LastName, Address, Mobile, Email, Password, CreatedAt, ModifiedAt) values (@fn, @ln, @add, @mb, @em, @pwd, @cat, @mat);";

        //        command.CommandText = query;
        //        command.Parameters.Add("@fn", System.Data.SqlDbType.NVarChar).Value = user.FirstName;
        //        command.Parameters.Add("@ln", System.Data.SqlDbType.NVarChar).Value = user.LastName;
        //        command.Parameters.Add("@add", System.Data.SqlDbType.NVarChar).Value = user.Address;
        //        command.Parameters.Add("@mb", System.Data.SqlDbType.NVarChar).Value = user.Mobile;
        //        command.Parameters.Add("@em", System.Data.SqlDbType.NVarChar).Value = user.Email;
        //        command.Parameters.Add("@pwd", System.Data.SqlDbType.NVarChar).Value = user.Password;
        //        command.Parameters.Add("@cat", System.Data.SqlDbType.NVarChar).Value = user.CreatedAt;
        //        command.Parameters.Add("@mat", System.Data.SqlDbType.NVarChar).Value = user.ModifiedAt;

        //        command.ExecuteNonQuery();
        //    }
        //    return true;
        //}

        //public string IsUserPresent(string email, string password)
        //{
        //    User user = new();
        //    using (SqlConnection connection = new(dbconnection))
        //    {
        //        SqlCommand command = new()
        //        {
        //            Connection = connection
        //        };

        //        connection.Open();
        //        string query = "SELECT COUNT(*) FROM Users WHERE Email='" + email + "' AND Password='" + password + "';";
        //        command.CommandText = query;
        //        int count = (int)command.ExecuteScalar();
        //        if (count == 0)
        //        {
        //            connection.Close();
        //            return "";
        //        }

        //        query = "SELECT * FROM Users WHERE Email='" + email + "' AND Password='" + password + "';";
        //        command.CommandText = query;

        //        SqlDataReader reader = command.ExecuteReader();
        //        while (reader.Read())
        //        {
        //            user.Id = (int)reader["UserId"];
        //            user.FirstName = (string)reader["FirstName"];
        //            user.LastName = (string)reader["LastName"];
        //            user.Email = (string)reader["Email"];
        //            user.Address = (string)reader["Address"];
        //            user.Mobile = (string)reader["Mobile"];
        //            user.Password = (string)reader["Password"];
        //            user.CreatedAt = (string)reader["CreatedAt"];
        //            user.ModifiedAt = (string)reader["ModifiedAt"];
        //        }

        //        string key = "MNU66iBl3T5rh6H52i69";
        //        string duration = "60";
        //        var symmetrickey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        //        var credentials = new SigningCredentials(symmetrickey, SecurityAlgorithms.HmacSha256);

        //        var claims = new[]
        //        {
        //            new Claim("id", user.Id.ToString()),
        //            new Claim("firstName", user.FirstName),
        //            new Claim("lastName", user.LastName),
        //            new Claim("address", user.Address),
        //            new Claim("mobile", user.Mobile),
        //            new Claim("email", user.Email),
        //            new Claim("createdAt", user.CreatedAt),
        //            new Claim("modifiedAt", user.ModifiedAt)
        //        };

        //        var jwtToken = new JwtSecurityToken(
        //            issuer: "localhost",
        //            audience: "localhost",
        //            claims: claims,
        //            expires: DateTime.Now.AddMinutes(Int32.Parse(duration)),
        //            signingCredentials: credentials);

        //        return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        //    }
        //    return "";
        //}

        public void InsertFeedback(Feedback feedback)
        {
            using SqlConnection connection = new(dbconnection);
            SqlCommand command = new()
            {
                Connection = connection
            };

            string query = "INSERT INTO Feedbacks (UserId, ItemId, Feedback, CreatedAt) VALUES (@uid, @pid, @rv, @cat);";
            command.CommandText = query;
            command.Parameters.Add("@uid", System.Data.SqlDbType.Int).Value = feedback.User.Id;
            command.Parameters.Add("@pid", System.Data.SqlDbType.Int).Value = feedback.Item.Id;
            command.Parameters.Add("@rv", System.Data.SqlDbType.NVarChar).Value = feedback.Value;
            command.Parameters.Add("@cat", System.Data.SqlDbType.NVarChar).Value = feedback.CreatedAt;

            connection.Open();
            command.ExecuteNonQuery();
        }

        //public User GetUser(int id)
        //{
        //    var user = new User();
        //    using (SqlConnection connection = new(dbconnection))
        //    {
        //        SqlCommand command = new()
        //        {
        //            Connection = connection
        //        };

        //        string query = "SELECT * FROM Users WHERE UserId=" + id + ";";
        //        command.CommandText = query;

        //        connection.Open();
        //        SqlDataReader reader = command.ExecuteReader();
        //        while (reader.Read())
        //        {
        //            user.Id = (int)reader["UserId"];
        //            user.FirstName = (string)reader["FirstName"];
        //            user.LastName = (string)reader["LastName"];
        //            user.Email = (string)reader["Email"];
        //            user.Address = (string)reader["Address"];
        //            user.Mobile = (string)reader["Mobile"];
        //            user.Password = (string)reader["Password"];
        //            user.CreatedAt = (string)reader["CreatedAt"];
        //            user.ModifiedAt = (string)reader["ModifiedAt"];
        //        }
        //    }
        //    return user;
        //}

        public User GetUser(int userId)
        {
            var user = new User();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };
                connection.Open();

                string query = "SELECT * From AspNetUsers WHERE Id='" + userId + "';";
                command.CommandText = query;

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    user.Id = (int)reader["Id"];
                    user.Email = (string)reader["Email"];
                    user.UserName = (string)reader["UserName"];
                }
            }
            return user;
        }

        // Needs GetUser()!!!!

        public List<Feedback> GetItemFeedbacks(int itemId)
        {
            var feedbacks = new List<Feedback>();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = "SELECT * FROM Feedbacks WHERE ItemId=" + itemId + ";";
                command.CommandText = query;

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var feedback = new Feedback()
                    {
                        Id = (int)reader["FeedbackId"],
                        Value = (string)reader["Feedback"],
                        CreatedAt = (string)reader["CreatedAt"]
                    };

                    var userid = (int)reader["UserId"];
                    feedback.User = GetUser(userid);

                    var itemid = (int)reader["ItemId"];
                    feedback.Item = GetItem(itemid);

                    feedbacks.Add(feedback);
                }
            }
            return feedbacks;
        }

        public bool InsertCartItem(int userId, int itemId)
        {
            using (SqlConnection connection = new SqlConnection(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                connection.Open();
                string query = "SELECT COUNT(*) FROM Carts WHERE UserId=" + userId + " AND Ordered='false';";
                command.CommandText = query;
                int count = (int)command.ExecuteScalar();
                if (count == 0)
                {
                    query = "INSERT INTO Carts (UserId, Ordered, OrderedOn) VALUES (" + userId + ", 'false', '');";
                    command.CommandText = query;
                    command.ExecuteNonQuery();
                }

                query = "SELECT CartId FROM Carts WHERE UserId=" + userId + " AND Ordered='false';";
                command.CommandText = query;
                int cartId = (int)command.ExecuteScalar();


                query = "INSERT INTO CartItems (CartId, ItemId) VALUES (" + cartId + ", " + itemId + ");";
                command.CommandText = query;
                command.ExecuteNonQuery();
                return true;


            }
        }

        // Requires GetUser()!!!
        public Cart GetActiveCartOfUser(int userid)
        {
            var cart = new Cart();
            using (SqlConnection connection  = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };
                connection.Open();

                string query = "SELECT COUNT(*) From Carts WHERE UserId=" + userid + " AND Ordered='false';";
                command.CommandText = query;

                int count = (int)command.ExecuteScalar();
                if(count == 0)
                {
                    return cart;
                }

                query = "SELECT CartId From Carts WHERE UserId=" + userid + " AND Ordered='false';";
                command.CommandText = query;

                int cartid = (int)command.ExecuteScalar();

                query = "SELECT * From CartItems WHERE CartId=" + cartid + ";";
                command.CommandText = query;

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    CartItem item = new()
                    {
                        Id = (int)reader["CartItemId"],
                        Item = GetItem((int)reader["ItemId"])
                    };
                    cart.CartItems.Add(item);
                }
                cart.Id = cartid;
                cart.User = GetUser(userid);
                cart.Ordered = false;
                cart.OrderedOn = "";
            }
            return cart;
        }

        public List<Cart> GetAllPreviousCartsOfUser(int userid)
        {
            var carts = new List<Cart>();
            using (SqlConnection connection = new SqlConnection(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };
                string query = "SELECT CartId FROM Carts WHERE UserId=" + userid + " AND Ordered='true';";
                command.CommandText = query;
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var cartid = (int)reader["CartId"];
                    carts.Add(GetCart(cartid));
                }
            }
            return carts;
        }

        // Requires GetUser()!!!
        // The GetCart method returns a Cart object!!!
        public Cart GetCart(int cartid)
        {
            var cart = new Cart();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };
                connection.Open();

                string query = "SELECT * FROM CartItems WHERE CartId=" + cartid + ";";
                command.CommandText = query;

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    CartItem item = new()
                    {
                        Id = (int)reader["CartItemId"],
                        Item = GetItem((int)reader["ItemId"])
                    };
                    cart.CartItems.Add(item);
                }
                reader.Close();

                query = "SELECT * FROM Carts WHERE CartId=" + cartid + ";";
                command.CommandText = query;
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    cart.Id = cartid;
                    cart.User = GetUser((int)reader["UserId"]);
                    cart.Ordered = bool.Parse((string)reader["Ordered"]);
                    cart.OrderedOn = (string)reader["OrderedOn"];
                }
                reader.Close();
            }
            return cart;
        }


        public List<PaymentMethod> GetPaymentMethods()
        {
            var result = new List<PaymentMethod>();
            using(SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = "SELECT * FROM PaymentMethods;";
                command.CommandText = query;

                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    PaymentMethod paymentMethod = new()
                    {
                        Id = (int)reader["PaymentMethodId"],
                        Type = (string)reader["Type"],
                        Provider = (string)reader["Provider"],
                        Available = bool.Parse((string)reader["Available"]),
                        Reason = (string)reader["Reason"]
                    };
                    result.Add(paymentMethod);
                }
            }
            return result;
        }

        public int InsertPayment(Payment payment)
        {
            int value = 0;
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = @"INSERT INTO Payments (PaymentMethodId, UserId, TotalAmount, ShippingCharges, AmountReduced, AmountPaid, CreatedAt) 
                                VALUES (@pmid, @uid, @ta, @sc, @ar, @ap, @cat);";

                command.CommandText = query;
                command.Parameters.Add("@pmid", System.Data.SqlDbType.Int).Value = payment.PaymentMethod.Id;
                command.Parameters.Add("@uid", System.Data.SqlDbType.Int).Value = payment.User.Id;
                command.Parameters.Add("@ta", System.Data.SqlDbType.NVarChar).Value = payment.TotalAmount;
                command.Parameters.Add("@sc", System.Data.SqlDbType.NVarChar).Value = payment.ShippingCharges;
                command.Parameters.Add("@ar", System.Data.SqlDbType.NVarChar).Value = payment.AmountReduced;
                command.Parameters.Add("@ap", System.Data.SqlDbType.NVarChar).Value = payment.AmountPaid;
                command.Parameters.Add("@cat", System.Data.SqlDbType.NVarChar).Value = payment.CreatedAt;

                connection.Open();
                value = command.ExecuteNonQuery();

                if (value > 0)
                {
                    query = "SELECT TOP 1 Id FROM Payments ORDER BY Id DESC;";
                    command.CommandText = query;
                    value = (int)command.ExecuteScalar();
                }
                else
                {
                    value = 0;
                }
            }
            return value;
        }

        public int InsertOrder(Order order)
        {
            int value = 0;

            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = "INSERT INTO Orders (UserId, CartId, PaymentId, CreatedAt) values (@uid, @cid, @pid, @cat);";

                command.CommandText = query;
                command.Parameters.Add("@uid", System.Data.SqlDbType.Int).Value = order.User.Id;
                command.Parameters.Add("@cid", System.Data.SqlDbType.Int).Value = order.Cart.Id;
                command.Parameters.Add("@cat", System.Data.SqlDbType.NVarChar).Value = order.CreatedAt;
                command.Parameters.Add("@pid", System.Data.SqlDbType.Int).Value = order.Payment.Id;

                connection.Open();
                value = command.ExecuteNonQuery();

                if (value > 0)
                {
                    query = "UPDATE Carts SET Ordered='true', OrderedOn='" + DateTime.Now.ToString(dateformat) + "' WHERE CartId=" + order.Cart.Id + ";";
                    command.CommandText = query;
                    command.ExecuteNonQuery();

                    query = "SELECT TOP 1 Id FROM Orders ORDER BY Id DESC;";
                    command.CommandText = query;
                    value = (int)command.ExecuteScalar();
                }
                else
                {
                    value = 0;
                }
            }

            return value;
        }
    }
}


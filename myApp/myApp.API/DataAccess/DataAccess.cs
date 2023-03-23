using System;
using System.Data.SqlClient;
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

    }
}


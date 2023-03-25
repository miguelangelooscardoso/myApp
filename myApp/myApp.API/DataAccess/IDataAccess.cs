using System;
using myApp.API.Models;

namespace myApp.API.DataAccess
{
    public interface IDataAccess
	{
        List<ItemCategory> GetItemCategories();
        ItemCategory GetItemCategory(int id);
        Offer GetOffer(int id);
        List<Item> GetItems(string category, string artist, int count);
        Item GetItem(int id);
        bool InsertUser(User user);
        string IsUserPresent(string email, string password);
        //void InsertFeedback(Feedback feedback);
    }
}


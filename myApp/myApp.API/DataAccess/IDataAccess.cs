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
    }
}


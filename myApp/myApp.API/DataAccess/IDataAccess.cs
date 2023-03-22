using System;
using myApp.API.Models;

namespace myApp.API.DataAccess
{
	public interface IDataAccess
	{
        public List<ItemCategory> GetItemCategories();

        //public List<ItemCategory> GetItemCategories()
        //{
        //    //throw new NotImplementedException();
        //}
    }
}


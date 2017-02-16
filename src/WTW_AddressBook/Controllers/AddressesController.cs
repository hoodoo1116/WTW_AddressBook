using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WTW_AddressBook.Data;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WTW_AddressBook.Controllers
{
    [Route("api/[controller]")]
    public class AddressesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Address> Get()
        {
            var values = new List<Address>();

            using (var dataContext = new AddressContext())
            {
                values = dataContext.Addresses.ToList();
            }

            return values;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Address Get(int id)
        {
            var value = new Address();
            using (var dataContext = new AddressContext())
            {
                value = dataContext.Addresses.FirstOrDefault(item => item.AddressId == id);
            }

            return value;
        }

        // POST api/values
        [HttpPost]
        public void Post(Address value)
        {
            using (var dataContext = new AddressContext())
            {
                dataContext.Addresses.Add(value);
                dataContext.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, Address value)
        {          
            using (var dataContext = new AddressContext())
            {
                var updateValue = dataContext.Addresses.FirstOrDefault(item => item.AddressId == id);

                updateValue.AddressLineOne = value.AddressLineOne;
                updateValue.AddressLineTwo = value.AddressLineTwo;
                updateValue.City = value.City;
                updateValue.AddressState = value.AddressState;
                updateValue.Zip = value.Zip;
                updateValue.Country = value.Country;

                dataContext.SaveChanges();
            }    
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var dataContext = new AddressContext())
            {
                var updateValue = dataContext.Addresses.FirstOrDefault(item => item.AddressId == id);

                if(null != updateValue)
                {
                    dataContext.Addresses.Remove(updateValue);
                    dataContext.SaveChanges();
                }
            }
        }
    }
}

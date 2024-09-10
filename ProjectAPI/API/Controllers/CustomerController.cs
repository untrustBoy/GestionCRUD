using Business;
using DataAccess.Data;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using CustomerEntity = DataAccess.Data.Customer;
using PostEntity = DataAccess.Data.Post;
using System.Collections.Generic;

namespace API.Controllers.Customer
{
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private BaseService<CustomerEntity> CustomerService;
        public BaseService<PostEntity> PostService;
        public CustomerController(BaseService<CustomerEntity> customerService, BaseService<PostEntity> postService)
        {
            CustomerService = customerService;
            PostService = postService;
        }


        [HttpGet()]
        public IQueryable<CustomerEntity> GetAll()
        {
            return CustomerService.GetAll();
        }

        [HttpGet("{id}")]
        public CustomerEntity Get(int id)
        {
            return CustomerService.Get(id);
        }


        [HttpPost()]
        public IActionResult Create([FromBodyAttribute] CustomerEntity entity)
        {
            return CreateCustomer(entity);
        }

        private IActionResult CreateCustomer(CustomerEntity entity)
        {
            // Validar si ya existe un empleado con el mismo nombre
            if (CustomerService.GetAll().Any(c => c.name == entity.name))
            {
                return Ok(new { status = false, message = $"El empleado con el nombre {entity.name} ya existe." });

            }

            var createdCustomer = CustomerService.Create(entity);
            return Ok(createdCustomer);
        }

        [HttpPut()]
        public CustomerEntity Update([FromBodyAttribute] CustomerEntity entity)
        {
            return CustomerService.Update(entity.customerId, entity, out bool changed);
        }

        //[HttpDelete()]
        //public CustomerEntity Delete([FromBodyAttribute] CustomerEntity entity)
        //{
        //    return CustomerService.Delete(entity);
        //}

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = CustomerService.DeleteById(id);
            if (deleted)
            {
                List<PostEntity> posts = PostService.GetAll().Where(p => p.CustomerId == id).ToList();
                foreach (var post in posts)
                {
                    PostService.Delete(post);
                }
                return Ok(new {status= true, message = $"El empleado con ID {id} ha sido eliminado." });
            }

            return NotFound(new { status = false, message = $"El empleado con ID {id} no existe." });
        }
    }
}

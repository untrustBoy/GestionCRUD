using Business;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using PostEntity = DataAccess.Data.Post;
using CustomerEntity = DataAccess.Data.Customer;

namespace API.Controllers.Post
{
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private BaseService<PostEntity> PostService;
        private BaseService<CustomerEntity> CustomerService;
        public PostController(BaseService<PostEntity> postService, BaseService<CustomerEntity> customerService)
        {
            PostService = postService;
            CustomerService = customerService;
        }

        //[HttpGet()]
        //public IQueryable<PostEntity> GetAll()
        //{
        //    return PostService.GetAll();
        //}

        [HttpGet()]
        public ActionResult<PostEntity> GetAllT()
        {
            var posts = PostService.GetAll();
            var customers = CustomerService.GetAll();

            var postDetails = from post in posts
                              join customer in customers on post.CustomerId equals customer.customerId
                              select new
                              {
                                  post.PostId,
                                  post.Title,
                                  post.Body,
                                  post.Type,
                                  post.Category,
                                  post.CustomerId,
                                  CustomerName = customer.name
                              };

            return Ok(postDetails);
        }

        [HttpGet("{id}")]
        public PostEntity Get(int id)
        {
            return PostService.Get(id);
        }

        [HttpPost()]
        public PostEntity Create([FromBodyAttribute]  PostEntity entity)
        {
            return CreatePost(entity);
        }
        private PostEntity CreatePost(PostEntity entity)
        {
            
            return PostService.Create(entity);
            
        }

        [HttpPut()]
        public PostEntity Update([FromBodyAttribute] PostEntity entity)
        {
            return PostService.Update(entity.PostId, entity, out bool changed);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = PostService.DeleteById(id);
            if (!deleted)
            {
                return NotFound($"El post con ID {id} no existe.");

            }
            return Ok($"El post con ID {id} ha sido eliminado.");

        }


    }
}

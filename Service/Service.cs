using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Model.Account;
using Persistence;
using System.Data;
using Utility;

namespace Service
{
    public class Service : IService.IService
    {
        readonly Context _dbConnection;
        readonly DataResponse _response;
        public Service(Context dbConnection, DataResponse response)
        {
            _dbConnection = dbConnection;
            _response = response;
        }
        public async Task<DataResponse> Login(Model.Account.Profile profile)
        {
            try
            {
                var profiles = await _dbConnection.Profiles
                .Where(x => x.Email == profile.Email && x.Password == profile.Password)
                .ToListAsync();
                if (profiles != null)
                {
                    _response.Status = "SUCCESS";
                    _response.Message = "User Login Successfully !!";
                }
                else
                {
                    _response.Status = "ERROR";
                    _response.Message = "Invalid User !!";
                }
                return _response;
            }
            catch (Exception)
            {
                throw;
            }
            
        }

        public void SP_Execute(Profile entity)
        {
            var nameParam = new SqlParameter("@Email", entity.Email);
            var priceParam = new SqlParameter("@Password", entity.Password);
            var data = _dbConnection.Database.ExecuteSqlRaw("SP_TASK_LOGIN @Email, @Password", nameParam, priceParam);
        }
    }
}

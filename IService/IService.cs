using Model.Account;
using Utility;

namespace IService
{

    public interface IService
    {
        Task<DataResponse> Registration(Profile profile);
        Task<DataResponse> Login(Profile profile);
    }
}

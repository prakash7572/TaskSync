using Model.Account;
using Utility;

namespace IService
{

    public interface IService
    {
        Task<DataResponse> Login(Profile profile);
    }
}

using Model.ViewModel.Account;
using Utility;

namespace IService
{

    public interface IService
    {
        Task<DataResponse> Registration(Model.Model.Account.Profile profile);
        Task<DataResponse> Login(Profile profile);
    }
}

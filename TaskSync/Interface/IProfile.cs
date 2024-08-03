namespace TaskSync.Interface
{
    public interface IProfile
    {
        Task<List<TaskSync.Helpher.DataResponse>> Login(Models.Profile profile);
    }
}

using IService;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Service;
using Utility;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the DI container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<Context>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString")));

builder.Services.AddTransient<IService.IService, Service.Service>();
builder.Services.AddScoped<IListItem, ListItem>();
builder.Services.AddTransient<DataResponse>();
builder.Services.AddMvc();

// Configure cookie-based authentication.
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/home/Login"; // Path to the login page
        options.LogoutPath = "/home/Logout"; // 
        options.Cookie.Name = "TaskSync_Cookie";
        options.Cookie.HttpOnly = true; // Prevent JavaScript access
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Enforce HTTPS
        options.ExpireTimeSpan = TimeSpan.FromDays(7); // Cookie lifetime
        options.SlidingExpiration = true; // Renew cookie if user is active
        options.Cookie.SameSite = SameSiteMode.Strict; // Prevent cross-site request issues
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts(); // Add Strict Transport Security headers
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// **Order matters here!** Ensure Authentication comes before Authorization.
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();





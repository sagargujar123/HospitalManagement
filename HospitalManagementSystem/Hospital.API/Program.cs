using Hospital.API.Extensions;
using HospitalManagementSystem.API.Profiles;
using HospitalManagementSystem.DAL.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRepositoryServices();
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Connection string (appsettings.json must contain DefaultConnection)
builder.Services.AddDbContext<HospitalDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

// JWT Authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

// Swagger with JWT
builder.Services.AddSwaggerWithJwt();

// API behavior for model validation
builder.Services.ConfigureApiBehavior();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

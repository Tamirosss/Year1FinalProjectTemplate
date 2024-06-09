using System.ComponentModel.DataAnnotations;
using System.Data.Common;
using System.Net;
using Microsoft.EntityFrameworkCore;
using UUIDNext;
using static Project.Utils;

namespace Project;

class Program
{
  static void Main()
  {
    /*───────────────────────────╮
    │ Creating the server object │
    ╰───────────────────────────*/
    var server = new HttpListener();
    server.Prefixes.Add("http://*:5000/");
    server.Start();

    Console.WriteLine("Server started. Listening for requests...");
    Console.WriteLine("Main page on http://localhost:5000/website/index.html");

    /*─────────────────────────────────────╮
    │ Creating the database context object │
    ╰─────────────────────────────────────*/
    var databaseContext = new DatabaseContext();

    for (int i = 1; i < 28; i++)
    {
      if (databaseContext.Dates.FirstOrDefault(date => date.Day == i) == null)
      {
        databaseContext.Dates.Add(new Date(i));
      }
    }

    databaseContext.SaveChanges();

    /*─────────────────────────╮
    │ Processing HTTP requests │
    ╰─────────────────────────*/
    while (true)
    {


      /*────────────────────────────╮
      │ Waiting for an HTTP request │
      ╰────────────────────────────*/
      var serverContext = server.GetContext();
      var response = serverContext.Response;

      try
      {
        /*────────────────────────╮
        │ Handeling file requests │
        ╰────────────────────────*/
        serverContext.ServeFiles();

        /*───────────────────────────╮
        │ Handeling custome requests │
        ╰───────────────────────────*/
        HandleRequests(serverContext, databaseContext);

        /*───────────────────────────────╮
        │ Saving changes to the database │
        ╰───────────────────────────────*/
        databaseContext.SaveChanges();

      }
      catch (Exception e)
      {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(e);
        Console.ResetColor();
      }

      /*───────────────────────────────────╮
      │ Sending the response to the client │
      ╰───────────────────────────────────*/
      response.Close();
    }
  }

  static void HandleRequests(HttpListenerContext serverContext, DatabaseContext databaseContext)
  {
    var request = serverContext.Request;
    var response = serverContext.Response;

    string absPath = request.Url!.AbsolutePath;
    if (absPath == "/signUp")
    {
      (string username, string password) = request.GetBody<(string, string)>();

      var userId = Uuid.NewDatabaseFriendly(UUIDNext.Database.SQLite).ToString();
      Console.WriteLine(username);
      Console.WriteLine(password);
      Console.WriteLine(userId);

      var user = new User(userId, username, password);
      databaseContext.Users.Add(user);

      response.Write(userId);
    }

    else if (absPath == "/autoLogIn")
    {
      string userId = request.GetBody<string>();

      User user = databaseContext.Users.Find(userId)!;

      response.Write(new { username = user.Username });
    }

    else if (absPath == "/logIn")
    {
      (string username, string password) = request.GetBody<(string, string)>();

      User user = databaseContext.Users.First(
        u => u.Username == username && u.Password == password
      )!;

      response.Write(user.Id);
    }
    else if (absPath == "/setAppoitment")
    {
      (int day, string userId) = request.GetBody<(int, string)>();

      Date date = databaseContext.Dates.Find(day)!;

      date.UserId = userId;
    }

    else if (absPath == "/getUsername")
    {
      string userId = request.GetBody<string>();

      User user = databaseContext.Users.Find(userId)!;

      response.Write(user.Username);
    }

    else if (absPath == "/getAppoitment")
    {
      var perviews = databaseContext.Dates.ToArray();
      response.Write(perviews);
    }
    else if (absPath == "/cancelAppoitment")
    {
      (int day, string userId) = request.GetBody<(int, string)>();
      Console.WriteLine(day);
      Date date = databaseContext.Dates.Find(day)!;
      date.UserId = "";
    }


  }
}

class DatabaseContext : DbContextWrapper
{
  public DbSet<User> Users { get; set; }
  public DbSet<Date> Dates { get; set; }

  public DatabaseContext() : base("Database") { }
}


class User(string id, string username, string password)
{
  [Key]
  public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Date(int day)
{
  [Key]
  public int Day { get; set; } = day;
  public string UserId { get; set; } = "";
}
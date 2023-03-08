---
author: Serhat Oner
pubDatetime: 2023-03-08
title: What is Dependency Injection (DI) and Inversion of Control (IoC) Principle ?
postSlug: what-is-dependency-injection-and-inversion-of-control
featured: true
draft: false
tags:
  - dependency injection
  - inversion of control
  - programming
  - csharp
  - constructor functions
  - c#
  - IoC
  - DI
ogImage: https://mirchaemanuel.com/wp-content/uploads/2017/06/DIPIOC.png
description: Explanations of dependency injection and inversion of control principle in C#.
---

## Table of contents

## Prelude

In this blog post we will try to understand what is Dependency Injection, how it's used, what is Inversion of Control Principle (IoC) and what is the connection between Dependency Injection and Inversion of Control.

## What Is Dependency Injection?

Dependency Injection is a software pattern that enables us to creation of objects that depend on other objects to be decoupled from their dependencies. In other words, instead of a class creating its dependencies directly, the dependencies are injected into the class by an external entity. This external entity is called _Dependency Injection (DI) Container_. The main benefits of using DI are improved testability, maintainability, and flexibility.

- Dependeny Injection mostly being implemented by using the Constructor Methods of classes. This is called _Constructor Injection_

## What Is Inversion of Control Principle?

It's a broader concept than Dependency Injection. It means changing the flow of control in a software system. For instance, instead a class creating its dependencies and controlling the flow of execution an external entity handles this job.So it delegates the responsibilities to an external entity.The main benefits of using IoC are improved flexibility, reusability,and modularization.

## What Is the Connection Between Dependency Injection and Inversion of Control Principle?

In the previous part, we mentioned that IoC means inverting the flow of control in software system and it manages this with an _external entity_, right? Well, Most of the time, this external entity would be a Dependency Injection Container, because wait for it:

_Dependency Injection Containers are also an implementation of Inversion of Control principle._

- Dependency Injection is nothing but a concrete implementation of Inversion of Control principle.
- Inversion of Control principle is not a code, its not a service, its a principle that in many cases implemented with Dependency Injection containers.
- By using Dependency Injection, we achieve the goal of IoC by delegating the responsibility of creating and managing dependencies to an external entity.

Since we have explained what are Dependency Injection, Inversion of Control and their connections, Let's create a code example to see them in action.

## Code Example

In, NET6+ versions of NET Core, `Program.cs` file is the entry point for the application. We don't have `ConfigureServices` and `Configure` methods like previous versions. Instead we implement services after creating our `builder` and manage the pipeline after building our `builder`.

So imagine we have an interface called `IDeveloperService`:

```csharp

//Interface represents a service
public interface IDeveloperService{
    void WriteCode();
}
```

Then we are going to have a service that will inherit from IDeveloperService:

```csharp
public class JavaScriptDeveloper:IDeveloperService{

    void WriteCode(){
        Console.WriteLine($"I'm writing JavaScript code}");
    }
}
```

We've created our services, now we need another class to use this service. That means the class that is going to use the service will depend on the `JavaScriptDeveloper`! Using `JavaScriptDeveloper` will be a dependency.

Let's create it:

```csharp
//class that depends on the JavaScriptDeveloperService
public class Developer{

    private readonly IDeveloperService _developerService;

    public Developer(IDeveloperService developerService) {
        _developerService = developerService;
    }

    public void WriteCode(){
        _developerService.WriteCode(); // will output "I'm writing JavaScript code"
    }
}
```

Now what have done here so far ?

1. We have created an `IDeveloperService` interface and implemented it with `JavaScriptDeveloper`
2. We created `Developer` and within it we passed `IDeveloperService` to constructor as a parameter and with it's help we have called `WriteCode()` method of the `JavaScriptDeveloper`.
3. Constructor will help us with creation of the `IDeveloperService` instance when we use `Developer` class.

Now you're asking questions like "How can IDeveloperService instance use WriteCode() method?" or "How its even possible to create instance of an Interface?"

This is the part where we'll see how Dependency Injection containers work and handles this requirement for us. Remember when we mentioned IoC (Inversion of Control) principle, we mentioned that it's main purpose to delegate flow of control to an external entity and it generally does it with Dependency Injection Containers.

So let's see how it works in code, go to `Program.cs` file:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

This is a simple example of `Program.cs` file in NET6+ versions of NET Core applications. Don't worry about all the codes in the file since we just want to learn about Dependency Injection as an implementation of IoC.

In the `Program.cs` file, you can see the `var app = builder.Build();` declaration. We have to implement our Dependency Injection container right after this because have to use `builder.Services` property to use our Dependency Injection container.

Now, to use our `JavaScriptDeveloperService` methods with an instance of `IDeveloperService` interface, we have to tell our builder, that we're registering `IDeveloperService` inteface for our `JavaScriptDeveloperService` class.

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IDeveloperService, JavaScriptDeveloperService>(); //create developer service instance for IDeveloperService instance.
builder.Services.AddTransient<Developer>();
//....other codes

```

If we have to explain the code:

1. We registered `IDeveloperService` interface for `JavaScriptDeveloperService` class. So whenever we create an instance of `IDeveloperService` instance, an `JavaScriptDeveloperService` instance will be created in the background. In this way, we will be able to use `JavaScriptDeveloperService` methods.
2. We registered our `Developer` class also, because if we don't register it we won't be able to use _Constructor Injection_ and have dependencies.
3. We have registered our dependencies with `builder.Services`, "Services" is a property of builder, and its an instance of `IServiceCollection` class. `IServiceCollection` class comes from `Microsoft.Extensions.DependencyInjection.Abstractions` namespace.

So the area that we register our services is actually our _Dependency Injection Container_.

Now, we have registered our dependencies for `Developer` class through the Dependency Injection Container but for what? What's good in it for us? Well, most important benefit of Dependency Injection, it helps us with creating _Loosely Coupled_ dependencies.

Imagine, we want to change our `JavaScriptDeveloperService` with a different service named `CSharpDeveloperService`:

```csharp
public class CSharpDeveloperService:IDeveloperService{

    void WriteCode(){
        Console.WriteLine($"I'm writing CSharp code}");
    }
}
```

The only thing that we need to do is to change the registiration in the Dependency Injection Container in the `Program.cs` file:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IDeveloperService, CSharpDeveloperService>(); //create developer service instance for IDeveloperService instance.
builder.Services.AddTransient<Developer>();
//....other codes

```

Like that, just changing the Service class, we changed the entire dependency of `Developer` class.

```csharp
public void WriteCode(){
    _developerService.WriteCode(); // will output "I'm writing CSharp code"
}
```

From now, when `Developer` classes `WriteCode()` method is called, it will output "I'm writing CSharp code" instead of "I'm writing JavaScript code".

Now that can be a bit confusing, why just we don't configure the method and pass arguments to it instead of changing Service right ? Imagine you're using a Logging package in your application, and you're using it in everywhere. In big projects it's really hard to follow small code blocks. And you want to change you Logger package with a different package. Just changing the LoggerService in the Dependency Injection Container, you will be able to change the entire Logging operation in your application.

## Conclusion

- Inversion Of Control principle is a software principle that indicates control flow of the classes or other objects should be managed by an external entity thus increasing the flexibility of the application.
- Dependency Injection Containers are implementations of Inversion Of Control principles and in many cases it's implemented with constructor functions and its called "Constructor Injection".
- Dependency Injection makes our applications easy to manage and flexible.

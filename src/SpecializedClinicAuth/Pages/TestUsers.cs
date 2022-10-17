// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using IdentityModel;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Json;
using Duende.IdentityServer;
using Duende.IdentityServer.Test;

namespace SpecializedClinicAuth.Pages;

public class TestUsers
{
    public static List<TestUser> Users
    {
        get
        {
            var address = new
            {
                street_address = "3ra Calle",
                locality = "Guatemala",
                postal_code = 01018,
                country = "Alemania"
            };

            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "ernesto",
                    Password = "ernesto",
                    Claims =
                    {
                        new Claim(JwtClaimTypes.Name, "Ernesto Smith"),
                        new Claim(JwtClaimTypes.GivenName, "Ernesto"),
                        new Claim(JwtClaimTypes.FamilyName, "Smith"),
                        new Claim(JwtClaimTypes.Email, "ernest@email.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.WebSite, "http://ernest.com"),
                        new Claim(JwtClaimTypes.Address, JsonSerializer.Serialize(address), IdentityServerConstants.ClaimValueTypes.Json)
                    }
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "jgonzalez",
                    Password = "jgonzalez",
                    Claims =
                    {
                        new Claim(JwtClaimTypes.Name, "Jorge González"),
                        new Claim(JwtClaimTypes.GivenName, "Jorge"),
                        new Claim(JwtClaimTypes.FamilyName, "González"),
                        new Claim(JwtClaimTypes.Email, "JorgeGonzalez@email.com"),
                        new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                        new Claim(JwtClaimTypes.WebSite, "http://jorge.com"),
                        new Claim(JwtClaimTypes.Address, JsonSerializer.Serialize(address), IdentityServerConstants.ClaimValueTypes.Json)
                    }
                }
            };
        }
    }
}
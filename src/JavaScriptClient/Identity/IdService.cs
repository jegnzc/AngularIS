using Duende.Bff;

namespace JavaScriptClient.Identity;

public class IdService : IBffEndpointService
{
    public Task ProcessRequestAsync(HttpContext context)
    {
        throw new NotImplementedException();
    }
}

public class Id2Service : ILoginService
{
    public Task ProcessRequestAsync(HttpContext context)
    {
        throw new NotImplementedException();
    }
}


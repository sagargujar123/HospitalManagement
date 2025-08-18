namespace Hospital.Common.Helpers
{
    public class ApiResponse<T>
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        public ApiResponse(int statusCode, string message, T data)
        {
            StatusCode = statusCode;
            Message = message;
            Data = data;
        }
    }

    public class ApiFailureResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public ApiFailureResponse(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }
    }
}

namespace Hospital.Common.Helpers
{
    public static class ResponseHelper
    {
        public static ApiResponse<T> Success<T>(T data, string message, int statusCode = 200)
       => new ApiResponse<T>(statusCode, message, data);

        //public static ApiResponse<T> Failure<T>(string message, int statusCode = 404)
        //    => new ApiResponse<T>(statusCode, message, default);

        public static ApiFailureResponse Failure(string message, int statusCode = 404)
        => new ApiFailureResponse(statusCode, message);

        public static ApiFailureResponse Unauthorize(string message, int statusCode = 401)
            => new ApiFailureResponse(statusCode, message);

        public static ApiFailureResponse BadRequestError(string message, int statusCode = 400)
            => new ApiFailureResponse(statusCode, message);
    }
}

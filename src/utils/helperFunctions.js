export const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const sendResponse = (res, { status = 200, success = true, message, data = null, meta = null }) => {
    res.status(status).json({
        success,
        message,
        ...(data && { data }),
        ...(meta && { meta }),
    });
};

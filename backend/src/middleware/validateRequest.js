export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorMessages = result.error.issues.map((err) => err.message);
      console.log("Validation errors:", errorMessages);
      return res.status(400).json({
        error: errorMessages.join(", "),
        message: errorMessages.join(", "),
      });
    }
    next();
  };
};

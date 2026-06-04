export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formatted = result.error.format();
      const flatErrors = object
        .values(formatted)
        .flat()
        .filter(Boolean)
        .map((err) => err._errors)
        .flat();

        console.log(flatErrors)
        return res.status(400).json({message: flatErrors.join(", ")})
    }
    next();
  };
};

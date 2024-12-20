const jwt = require("jsonwebtoken");
// Utilisation de la clé JWT de l'environnement
const safetyKeyJwt = process.env.JWT_SECRET || "safetyKeyJwt";

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token manquant ou mal formaté." });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, safetyKeyJwt);
    console.log("Token décodé:", decodedToken); 

    if (!Array.isArray(decodedToken.roles)) {
      return res.status(400).json({
        message: "Les rôles dans le token ne sont pas valides.",
      });
    }

    req.auth = {
      userId: decodedToken.userId,
      roles: Array.isArray(decodedToken.roles)
        ? decodedToken.roles
        : [decodedToken.roles],
    };

    console.log("req.auth:", req.auth);
    
    next();
  } catch (error) {
    let message = "Token invalide ou manquant.";
    if (error.name === "TokenExpiredError") {
      message = "Le token a expiré.";
    } else if (error.name === "JsonWebTokenError") {
      message = "Le token est invalide.";
    }
    console.error("Erreur JWT:", error); 
    res.status(401).json({ message, error: error.message });
  }
};

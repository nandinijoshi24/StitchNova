const prisma = require("../config/prismaClient");

// Add Garment
exports.addGarment = async (req, res) => {
  try {
    const { name, category, basePrice, description } = req.body;

    const garment = await prisma.garmentType.create({
      data: {
        name,
        category,
        basePrice,
        description,
      },
    });

    res.status(201).json({
      success: true,
      message: "Garment added successfully",
      data: garment,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Garments
exports.getGarments = async (req, res) => {
  try {
    const garments = await prisma.garmentType.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json({
      success: true,
      data: garments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get GarmentById

exports.getGarmentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const garment = await prisma.garmentType.findUnique({
      where: { id }
    });

    if (!garment) {
      return res.status(404).json({
        success: false,
        message: "Garment not found"
      });
    }

    res.json({
      success: true,
      data: garment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
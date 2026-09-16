const prisma = require("../config/prismaClient");

// Add Measurement
exports.addMeasurement = async (req, res) => {
  try {
    const {
      customerId,
      chest,
      waist,
      hip,
      shoulder,
      sleeve,
      length,
      notes,
    } = req.body;

    const measurement = await prisma.measurement.create({
      data: {
        customerId,
        chest,
        waist,
        hip,
        shoulder,
        sleeve,
        length,
        notes,
      },
    });

    res.status(201).json({
      success: true,
      message: "Measurement added successfully",
      data: measurement,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Measurements
exports.getMeasurements = async (req, res) => {
  try {
    const measurements = await prisma.measurement.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json({
      success: true,
      data: measurements,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
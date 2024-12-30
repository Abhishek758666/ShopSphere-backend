import User from "../database/models/userModel";
import bcrypt from "bcrypt";

const adminSeeder = async (): Promise<void> => {
  try {
    const [data] = await User.findAll({
      where: {
        email: "aabhik81@gmail.com",
      },
    });

    if (!data) {
      await User.create({
        email: "aabhik81@gmail.com",
        password: bcrypt.hashSync("password1", 10),
        username: "abhishek",
        role: "admin",
      });
      console.log("admin seeded successfully");
    } else {
      console.log("admin already exist");
    }
  } catch (error) {
    console.log("something went wrong");
  }
};

export default adminSeeder;

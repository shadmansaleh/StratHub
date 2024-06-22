import { Request, Response } from "express";
import * as types from "../types/LocalTypes";
import User from "../models/UserModel";
import Appointment from "../models/AppointmentModel";
import { StorageDeleteByID } from "./StorageController";

export const UserGetController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const id = (req.query.id as string) || req?.user?.id;
  try {
    const user = await User.findById(id).select("-password").exec();
    res.status(200).json({ message: "User found", user: user });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "User not found" });
  }
};
export const UserGetAllController = async (req: Request, res: Response) => {
  const users = await User.find().select("-password").exec();
  res.status(200).json({ users: users });
};

export const UserUpdateController = async (
  req: types.AuthRequest,
  res: Response
) => {
  try {
    let user = await User.findById<types.User>(req?.user?.id)
      .select("-password")
      .exec();
    if (!user) return res.status(400).json({ message: "User not found" });

    if (req.body.profile_pic !== user.profile_pic) {
      try {
        await StorageDeleteByID(user.profile_pic, req?.user);
      } catch (e) {
        console.error(e);
      }
    }

    for (let key in req.body) {
      if (User.schema.obj.hasOwnProperty(key)) {
        // @ts-ignore
        user[key] = req.body[key];
      }
    }
    await user.save();
    res.status(200).json({ message: "Profile updated", user: user });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "Error updating profile" });
  }
};

export const UserFindUsersController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const type = req.query.type as string;
  const catagories: string[] = (req.query.catagories as string)
    ? JSON.parse(req.query.catagories as string)
    : [];
  const query = req.query.query as string;
  let users = null;
  try {
    if (catagories.length > 0) {
      users = await User.find({
        $and: [
          { role: type || "*" },
          { designation: { $in: catagories.length > 0 ? catagories : ["*"] } },
          {
            $or: [
              { username: { $regex: query, $options: "i" } },
              { first_name: { $regex: query, $options: "i" } },
              { last_name: { $regex: query, $options: "i" } },
              { email: { $regex: query, $options: "i" } },
            ],
          },
        ],
      })
        .select("-password")
        .exec();
    } else {
      users = await User.find({
        $and: [
          { role: type || "*" },
          {
            $or: [
              { username: { $regex: query, $options: "i" } },
              { first_name: { $regex: query, $options: "i" } },
              { last_name: { $regex: query, $options: "i" } },
              { email: { $regex: query, $options: "i" } },
            ],
          },
        ],
      })
        .select("-password")
        .exec();
    }
    res.status(200).json({ users: users });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "Error finding users" });
  }
};

export const UserFavoritesController = async (
  req: types.AuthRequest,
  res: Response
) => {
  let data = null;
  try {
    if (req.query.populate_data === "true") {
      data = await User.findById(req?.user?.id)
        .select("favorites")
        .populate("favorites")
        .exec();
    } else {
      data = await User.findById(req?.user?.id).select("favorites").exec();
    }
    if (!data) return res.status(400).json({ message: "Favorites not found" });
    res.status(200).json({ favorites: data.favorites });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "Error getting favorites" });
  }
};

export const UserAddFavoriteController = async (
  req: types.AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req?.user?.id).exec();
    if (!user) return res.status(400).json({ message: "User not found" });
    const favorite = await User.findById(req.body.favorite_id).exec();
    if (!favorite)
      return res.status(400).json({ message: "Favorite not found" });
    if (!user.favorites.includes(req.body.favorite_id)) {
      user.favorites.push(req.body.favorite_id);
      await user.save();
    } else {
      return res.status(400).json({ message: "Favorite already added" });
    }
    res.status(200).json({ message: "Favorite added" });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "Error adding favorite" });
  }
};

export const UserRemoveFavoriteController = async (
  req: types.AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req?.user?.id).exec();
    if (!user) return res.status(400).json({ message: "User not found" });
    const favorite = await User.findById(req.body.favorite_id).exec();
    if (!favorite)
      return res.status(400).json({ message: "Favorite not found" });
    if (user.favorites.includes(req.body.favorite_id)) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== req.body.favorite_id
      );
      await user.save();
    } else {
      return res.status(400).json({ message: "Not in favorite list" });
    }
    res.status(200).json({ message: "Favorite removed" });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "Error removing favorite" });
  }
};

export const UserAddReviewController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const id = req.body.target;
  try {
    const user = await User.findById(id).exec();
    if (!user) return res.status(400).json({ message: "User not found" });
    const review = {
      name: req.body.name,
      rating: req.body.rating,
      review: req.body.review,
    };
    user.reviews.push(review);
    await user.save();
    res.status(200).json({ message: "Review added" });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "Error adding review" });
  }
};

export const UserGetAppointmentsController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const expert = req.query.expert as string;
  const date = req.query.date as string;
  const client = req.query.client as string;
  const start_time_only = req.query.start_time_only as string;
  const user = req.query.user as string;
  if (!expert && !client && !user)
    return res.status(400).json({ message: "ID not provided" });
  let query: any = {};
  if (user) query = { ["$or"]: [{ expert: user }, { client: user }] };
  if (date) query.date = date;
  if (client) query.client = client;
  if (expert) query.expert = expert;
  try {
    let appointments = null;
    if (start_time_only === "true") {
      appointments = (await Appointment.find(query).select("start_time").exec())
        .filter((app) => app.status !== types.AppointmentStatus.CANCELLED)
        .map((app) => app.start_time);
    } else {
      appointments = await Appointment.find(query)
        .populate("expert", "first_name last_name username")
        .populate("client", "first_name last_name username")
        .exec();
    }
    return res.status(200).json({ appointments: appointments });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "Error getting appointments" });
  }
};

export const UserSetAppointmentsController = async (
  req: types.AuthRequest,
  res: Response
) => {
  const expert = req.body.expert as string;
  const date = req.body.date as string;
  const start_time = req.body.start_time as string;
  const duration = req.body.duration as number;
  const service = req.body.service as string;

  if (!expert || !date || !start_time || !duration || !service)
    return res.status(400).json({ message: "Missing data" });

  try {
    const existing = await Appointment.findOne({
      date: date,
      start_time: start_time,
      expert: expert,
    });
    if (existing)
      return res.status(400).json({ message: "Slot already booked" });

    await new Appointment({
      date: date,
      start_time: start_time,
      expert: expert,
      client: req?.user?.id,
      service: service,
      duration: duration,
      status: "pending",
    }).save();
    return res.status(200).json({ message: "Appointment set" });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "Error setting appointment" });
  }
};

export const UserAppointmentUpdateStatus = async (
  req: types.AuthRequest,
  res: Response
) => {
  const id = req.body.id as string;
  const status = req.body.status as types.AppointmentStatus;
  if (!id || !status) return res.status(400).json({ message: "Missing data" });
  if (!["pending", "completed", "cancelled"].includes(status))
    return res.status(400).json({ message: "Invalid status" });
  try {
    const appointment = await Appointment.findById(id).exec();
    if (!appointment)
      return res.status(400).json({ message: "Appointment not found" });
    if (
      appointment.client.toString() !== req?.user?.id &&
      appointment.expert.toString() !== req?.user?.id
    )
      return res.status(400).json({ message: "Unauthorized" });
    appointment.status = status;
    await appointment.save();
    return res.status(200).json({ message: "Appointment updated" });
  } catch (e: any) {
    console.error(e.message);
    return res.status(400).json({ message: "Error updating appointment" });
  }
};

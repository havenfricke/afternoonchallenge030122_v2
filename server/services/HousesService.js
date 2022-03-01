import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class HousesService {
  async remove(houseId, userId) {
    const house = await this.getById(houseId)
    if (house.creatorId.toString() !== userId) {
      throw new Forbidden('Not your listing')
    }
    await dbContext.Houses.findByIdAndDelete(houseId)
  }
  async edit(update) {
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('You do not have permission to edit this car')
    }
    original.price = update.price ? update.price : original.price
    original.color = update.color ? update.color : original.color
    original.year = update.year ? update.year : original.year
    original.floors = update.floors ? update.floors : original.floors
    original.description = update.description ? update.description : original.description
    original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl

    await original.save({ runValidators: true })
    return original
  }

  async create(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }
  async getById(id) {
    const house = await dbContext.Houses.findById(id)
    if (!house) {
      throw new BadRequest('invalid house id')
    }
    return house
  }
  async getAll(query = {}) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }

}
export const housesService = new HousesService()
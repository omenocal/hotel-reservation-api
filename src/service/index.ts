import { dynamoDBClient } from "../model";
import ReservationService from "./ReservationService"

const reservationService = new ReservationService(dynamoDBClient());
export default reservationService;
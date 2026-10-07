import createFetchUserApi from "@/lib/users/createFetchUserApi";
import withMinimumDelay from "@/lib/users/withMinimumDelay";

const userApi = withMinimumDelay(createFetchUserApi());

export default userApi;

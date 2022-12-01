import newAccount from "./endpoints/background/newAccount";
import saveAll from "./endpoints/background/saveAll";

import price from "./endpoints/callables/price";
import paypalCreateOrder from "./endpoints/callables/paypalCreateOrder";
import paypalHandleOrder from "./endpoints/callables/paypalHandleOrder";
import changeUserPassword from "./endpoints/callables/changeUserPassword";
import failedRequests from "./endpoints/background/failedRequests";


export {
  failedRequests,
  newAccount,
  saveAll,
  price,
  paypalCreateOrder,
  paypalHandleOrder,
  changeUserPassword,
};

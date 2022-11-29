import * as functions from "firebase-functions";
import { isBlocked } from "../../../common";
import Form, { FormInput } from "../../../core/form";
import Redirect from "../../../core/redirect";
import { IncrementalData } from "../../../types";
import { Request, Response } from "express";
import * as express from "express";

interface NavigationData extends IncrementalData {
  action: string;
  inputs: FormInput[];
  actionButtons: FormInput[];
  name: string;
  systemMessage?: string;
}
const router = express.Router();
router.post("/", async (req: Request, res: Response) => {
  const data: NavigationData = req.body;
  if (await isBlocked(context)) return null;

  console.log("running formOptions...");
  const homePage = await Redirect.load({
    isPrimary: data.isPrimary,
    cookies: data.cookies,
    weirdData: data.weirdData,
    from:
      data.from ??
      "https://noor.moe.gov.sa/Noor/EduWavek12Portal/HomePage.aspx",
  });

  const form = await fetchOptions(data, homePage);

  // todo include the cookies and redirected;
  res.json(homePage.sendForm(form)).status(200);
});

export async function fetchOptions(data: NavigationData, homePage: Redirect) {
  const form = Form.fromJson({
    systemMessage: data.systemMessage!,
    action: data.action,
    weirdData: data.weirdData,
    inputs: data.inputs,
    actionButtons: data.actionButtons,
    ...homePage.send({}),
  });

  const selected = data.inputs.find((e) => e.name == data.name)!;

  const selectedValue = selected.options.find((e) => e.selected)!;
  await form.fetchFromOption(
    { id: "", name: selected.name!, value: selectedValue.value },
    [],
    homePage
  );
  return form;
}

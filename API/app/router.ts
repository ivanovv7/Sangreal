import express from "express";
import { ProductsController } from "./controller/productsController";
import { validateCreateDto, validateUpdateDto} from "./validators/validators";

export const router = express.Router();

const productsController = new ProductsController();

//While this request is open and streaming data on 3 seconds, we can add a new product menawhile and it will be delivered to the FE in the next stream.
//This process can be used for chat or for some running proccess that needs more time like the runs on cronos.
router.get("/sse_connection", async (req, res) => {
 
  res.setHeader("Content-type","text/event-stream");
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: Connected\n\n');


  const intervalId = setInterval( async () => {
    await productsController.sendSSEmessages(req,res)
  } , 3000)


  // The route LISTENS to an evnt "close" that can be trigured from the FE like -> OPTION-1: const eventSource = EventSource("/sse_connection"); eventSource.close(); -
  // or as an alternative OPTION-2: a new route can be hit from the FE at some point of the data stream from the open request that will emmit the "close" event.
  req.on('close', () => {
    clearInterval(intervalId); // Stop sending SSE messages
    res.end(); // End the response
  });
})



//GET ALL
router.get("/", async (req, res) => {
  await productsController.getAllProducts(req, res);
});

router.get("/andDeleted", async (req,res) => {
    await productsController.getAllAndDeleted(req,res);
})

//GET PRODUCT BY ID
router.get("/:id", async (req, res) => {
  await productsController.getProductById(req, res);
});

//CREATE ONE, here we have middleware to validate the re.body
router.post("/create/one", validateCreateDto, async (req, res) => {
  await productsController.createProduct(req, res);
});

router.patch("/update/:id", validateUpdateDto, async (req, res) => {
  await productsController.updateProduct(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  await productsController.softDeleteOne(req, res);
});

router.delete("/delete_collection", async (req, res) => {

  await productsController.hardDeleteCollection(req,res)

})






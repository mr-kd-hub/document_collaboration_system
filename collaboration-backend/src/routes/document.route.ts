import { Router } from "express"
import * as documentService from "../service/documents.service";
const router = Router(); // Create a new Router instance

router.post('/upsert',  documentService.upsertDocument);
router.post('/create',  documentService.createDocument);
router.get('/list',  documentService.getDocuments);
router.get('/:id',  documentService.getDocumentById);
router.put('/:id',  documentService.updateDocument);
router.delete('/:id',  documentService.deleteDocument);

export default router
import { defineStore } from "pinia";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore/lite";
import db from "../firebase/firebaseInit";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    invoiceData: [],
    newInvoice: null,
    modalActive: null,
    dataLoaded: null,
    currentInvoiceArray: null,
    editInvoice: null,
  }),

  actions: {
    TOGGLE_NEW_INVOICE() {
      this.newInvoice = !this.newInvoice;
    },

    TOGGLE_MODAL() {
      this.modalActive = !this.modalActive;
    },

    SET_CURRENT_INVOICE(payload) {
      this.currentInvoiceArray = this.invoiceData.filter((invoice) => {
        return invoice.invoiceId === payload;
      });
    },

    SET_INVOICE_DATA(payload) {
      this.invoiceData.push(payload);
    },

    INVOICES_LOADED() {
      this.dataLoaded = true;
    },

    async getInvoices() {
      const q = query(collection(db, "invoices"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (!this.invoiceData.some((invoice) => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };
          this.SET_INVOICE_DATA(data);
        }
      });
      this.INVOICES_LOADED();
    },

    DELETE_INVOICE(payload) {
      this.invoiceData = this.invoiceData.filter((invoice) => {
        invoice.docId !== payload;
      });
    },

    async UPDATE_INVOICE({ docId, routeId }) {
      this.DELETE_INVOICE(docId);
      await this.getInvoices();
      this.TOGGLE_NEW_INVOICE();
      this.TOGGLE_EDIT_INVOICE();
      this.SET_CURRENT_INVOICE(routeId);
    },

    TOGGLE_EDIT_INVOICE() {
      this.editInvoice = !this.editInvoice;
    },

    async REMOVE_INVOICE(docId) {
      const docRef = await doc(db, "invoices", docId);
      const getInvoice = await deleteDoc(docRef);

      this.DELETE_INVOICE(docId);
    },
  },
});

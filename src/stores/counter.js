import { defineStore } from "pinia";
import { collection, doc, getDoc } from "firebase/firestore/lite";
import db from "../firebase/firebaseInit";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    invoiceData: [],
    newInvoice: null,
    modalActive: null,
    dataLoaded: null,
  }),

  actions: {
    toggleNewInvoice() {
      this.newInvoice = !this.newInvoice;
    },

    toggleModal() {
      this.modalActive = !this.modalActive;
    },

    setInvoiceData(payload) {
      this.invoiceData.push(payload);
    },

    invoicesLoaded() {
      this.dataLoaded = true;
    },

    async getInvoices() {
      const getData = await collection(db, "invoices");
      const snapshot = await getDoc();

      //
      // getData.forEach((doc) => {
      // if (!this.invoiceData.some((invoice) => invoice.docId === doc.id)) {
      // const data = {
      // docId: doc.id,
      // invoiceId: doc.data().invoiceId,
      // billerStreetAddress: doc.data().billerStreetAddress,
      // billerCity: doc.data().billerCity,
      // billerZipCode: doc.data().billerZipCode,
      // billerCountry: doc.data().billerCountry,
      // clientName: doc.data().clientName,
      // clientEmail: doc.data().clientEmail,
      // clientStreetAddress: doc.data().clientStreetAddress,
      // clientCity: doc.data().clientCity,
      // clientZipCode: doc.data().clientZipCode,
      // clientCountry: doc.data().clientCountry,
      // invoiceDateUnix: doc.data().invoiceDateUnix,
      // invoiceDate: doc.data().invoiceDate,
      // paymentTerms: doc.data().paymentTerms,
      // paymentDueDateUnix: doc.data().paymentDueDateUnix,
      // paymentDueDate: doc.data().paymentDueDate,
      // productDescription: doc.data().productDescription,
      // invoiceItemList: doc.data().invoiceItemList,
      // invoiceTotal: doc.data().invoiceTotal,
      // invoicePending: doc.data().invoicePending,
      // invoiceDraft: doc.data().invoiceDraft,
      // invoicePaid: doc.data().invoicePaid,
      // };
      // this.setInvoiceData(data);
      // }
      // });

      // this.invoicesLoaded();
    },
  },
});

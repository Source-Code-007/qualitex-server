type TWorkPermit = {
  lubaNr: string;
  barcodeText: string;
  tootajaTeave: {
    nimi: string;
    isaNimi: string;
    emainimi: string;
    sunnipaev: string;
    passiNumber: string;
    pusivAadress: string;
    ePost: string;
  };
  tooandmiseDetailid: {
    ametikoht: string;
    tooKirjeldus: string;
    contractStartDate: string;
    contractEndDate: string;
    palkJaKasu: {
      kuuPalk: string;
    };
  };
  tooloaDetailid: {
    workPermitStartDate: string;
    workPermitEndDate: string;
  };
};

export { TWorkPermit };

'use strict';

export const processMtpBuffer = ({ error, stderr }) => {
  const errorDictionary = {
    noMtp: `No MTP device found.`,
    common: `Oops.. Your MTP device has gone crazy! Try again.`,
    unResponsive: `MTP device is not responding. Reload or reconnect device.`
  };

  const errorTpl = {
    noMtp: `No MTP device found`,
    invalidObjectHandle: `invalid response code InvalidObjectHandle`,
    invalidStorageID: `invalid response code InvalidStorageID`,
    fileNotFound: `could not find`,
    noFilesSelected: `No files selected`,
    writePipe: `WritePipe`,
    mtpStorageNotAccessible: `MTP storage not accessible`
  };

  const errorStringified = (error !== null && error.toString()) || '';
  const stderrStringified = (stderr !== null && stderr.toString()) || '';

  if (!errorStringified || !stderrStringified) {
    return {
      error: null,
      throwAlert: false,
      status: true
    };
  }

  if (
    /*No MTP device found*/
    stderrStringified.toLowerCase().indexOf(errorTpl.noMtp.toLowerCase()) !==
      -1 ||
    errorStringified.toLowerCase().indexOf(errorTpl.noMtp.toLowerCase()) !== -1
  ) {
    return {
      error: errorDictionary.noMtp,
      throwAlert: false,
      status: false
    };
  } else if (
    /*Path not found*/
    stderrStringified
      .toLowerCase()
      .indexOf(errorTpl.fileNotFound.toLowerCase()) !== -1 ||
    errorStringified
      .toLowerCase()
      .indexOf(errorTpl.fileNotFound.toLowerCase()) !== -1
  ) {
    return {
      error: sanitizeErrors(stderrStringified),
      throwAlert: true,
      status: true
    };
  } else if (
    /*No files selected*/
    stderrStringified
      .toLowerCase()
      .indexOf(errorTpl.noFilesSelected.toLowerCase()) !== -1 ||
    errorStringified
      .toLowerCase()
      .indexOf(errorTpl.noFilesSelected.toLowerCase()) !== -1
  ) {
    return {
      error: errorStringified,
      throwAlert: true,
      status: true
    };
  } else if (
    /*error: Get: invalid response code InvalidObjectHandle (0x2009)*/
    stderrStringified
      .toLowerCase()
      .indexOf(errorTpl.invalidObjectHandle.toLowerCase()) !== -1 ||
    errorStringified
      .toLowerCase()
      .indexOf(errorTpl.invalidObjectHandle.toLowerCase()) !== -1
  ) {
    return {
      error: errorDictionary.unResponsive,
      throwAlert: true,
      status: false
    };
  } else if (
    /*error: Get: invalid response code InvalidStorageID*/
    stderrStringified
      .toLowerCase()
      .indexOf(errorTpl.invalidStorageID.toLowerCase()) !== -1 ||
    errorStringified
      .toLowerCase()
      .indexOf(errorTpl.invalidStorageID.toLowerCase()) !== -1
  ) {
    return {
      error: errorDictionary.unResponsive,
      throwAlert: true,
      status: false
    };
  } else if (
    /*error: (*interface)->WritePipe(interface, ep->GetRefIndex(), buffer.data(), r): error 0xe00002eb*/
    stderrStringified
      .toLowerCase()
      .indexOf(errorTpl.writePipe.toLowerCase()) !== -1 ||
    errorStringified.toLowerCase().indexOf(errorTpl.writePipe.toLowerCase()) !==
      -1
  ) {
    return {
      error: errorDictionary.unResponsive,
      throwAlert: true,
      status: false
    };
  } else if (
    /*MTP storage not accessible*/
    stderrStringified
      .toLowerCase()
      .indexOf(errorTpl.mtpStorageNotAccessible.toLowerCase()) !== -1 ||
    errorStringified
      .toLowerCase()
      .indexOf(errorTpl.mtpStorageNotAccessible.toLowerCase()) !== -1
  ) {
    return {
      error: errorStringified,
      throwAlert: true,
      status: false
    };
  } else {
    /*common errors*/
    return {
      error: errorDictionary.common,
      throwAlert: true,
      status: true
    };
  }
};

export const processLocalBuffer = ({ error, stderr }) => {
  const errorDictionary = {
    noPerm: `Operation not permitted.`,
    commandFailed: `Could not complete! Try again.`,
    common: `Oops.. Your device has gone crazy! Try again.`,
    unResponsive: `Device is not responding! Reload`
  };

  const errorTpl = {
    noPerm: `Operation not permitted`,
    commandFailed: `Command failed`
  };

  const errorStringified = (error !== null && error.toString()) || '';
  const stderrStringified = (stderr !== null && stderr.toString()) || '';

  if (!errorStringified || !stderrStringified) {
    return {
      error: null,
      throwAlert: false
    };
  }

  if (
    /*No Permission*/
    stderrStringified.toLowerCase().indexOf(errorTpl.noPerm.toLowerCase()) !==
      -1 ||
    errorStringified.toLowerCase().indexOf(errorTpl.noPerm.toLowerCase()) !== -1
  ) {
    return {
      error: errorDictionary.noPerm,
      throwAlert: true
    };
  } else if (
    /*Command failed*/
    stderrStringified
      .toLowerCase()
      .indexOf(errorTpl.commandFailed.toLowerCase()) !== -1 ||
    errorStringified
      .toLowerCase()
      .indexOf(errorTpl.commandFailed.toLowerCase()) !== -1
  ) {
    return {
      error: errorDictionary.commandFailed,
      throwAlert: true
    };
  } else {
    /*common errors*/
    return {
      error: errorDictionary.common,
      throwAlert: true
    };
  }
};

const sanitizeErrors = string => {
  if (string === null) {
    return 'Oops.. Try again';
  }
  string = string.replace(/^(error: )/, '').trim();

  return string.charAt(0).toUpperCase() + string.slice(1);
};
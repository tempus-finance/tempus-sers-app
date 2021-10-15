const shortenAccount = (account: string): string => {
  return `${account.substring(0, 6)}...${account.substring(
    account.length - 5,
    account.length
  )}`;
};

export default shortenAccount;

const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");


describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a string when interger is given as input", () => {
    const trivialKey = deterministicPartitionKey(0);
    expect(trivialKey).toBe("0");
  });

  it("Returns a string when an object with actual interger greater than 0 given as input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:10});
    expect(trivialKey).toBe("10");
  });

  it("Returns a string when an object with actual interger 0 given as input", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:0});
    expect(trivialKey).not.toBe("0");
  });

  it("Returns a hax string when object {partitionKey:0} is given as input", () => {
    let object = {partitionKey:0}
    const trivialKey = deterministicPartitionKey(object);
    const expectedOutcome = crypto.createHash("sha3-512").update(JSON.stringify(object)).digest("hex");
    expect(trivialKey).toBe(expectedOutcome);
  });

  it("Returns length equal to given string length when object with value (string of a given length) is given as input", () => {
    let object = {partitionKey:'nwqhvakzruvdepryvpoatvngdntlgkozqibhklftcunlnqbitejeazohecbdylmelptqbnkcbdsazfbvkgamzxamfdtzjbeloyhbblxqfzjdjhahxucauhjiulxtgkvqkpyrazbfzcvnqsncemcghbophqwghscntubvuqmucutukfxyzubdbtsztysjsaondnwaliauphwkzrlrrbwsjjjqdvpoiketpddhcmsdbonsmyqk'}
    const trivialKey = deterministicPartitionKey(object);
    expect(trivialKey).toHaveLength(240);
  });

  it("Returns length equal to 128 when string of a given length is given as input", () => {
    let st = 'nwqhvakzruvdepryvpoatvngdntlgkozqibhklftcunlnqbitejeazohecbdylmelptqbnkcbdsazfbvkgamzxamfdtzjbeloyhbblxqfzjdjhahxucauhjiulxtgkvqkpyrazbfzcvnqsncemcghbophqwghscntubvuqmucutukfxyzubdbtsztysjsaondnwaliauphwkzrlrrbwsjjjqdvpoiketpddhcmsdbonsmyqk';
    const trivialKey = deterministicPartitionKey(st);
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns length equal to 128 when string of length greater than 256 is given as input", () => {
    let st = 'ojbasaquclrxvxpfdrgxnrnitedavemjvnhapyczfovrymhiyubwvpihxzsutsazfoljfzgvujqbowgzohspvsljznntqpsksxhmwnyjcaqcteqngksgmfduuseiyukglroullefvkiwxlzmwvzsbcgruqpgffkjcrvdueogukgmoxeilmbgycbcaungqjbqopwhcijrwaflbhbrqpssgkicpbymxtgsrriihkmjddzsgwbwclnxtbopeegfyuiadxwpitlohjkekaukqxlciuecxnjgnc';
    const trivialKey = deterministicPartitionKey(st);
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns length equal to 128 when number of length greater than 256 is given as input", () => {
    let numbers = 5933782147413200167297262441987913352810433935949349884691180954152836086937677831131391916065452615737279367306111604390402610671283943190987589353396290744127687689596966484698233615429446600510699201988498759982952407719477189546338676828803631725528266939561244048154867559436540360;
    const trivialKey = deterministicPartitionKey(numbers);
    expect(trivialKey).toHaveLength(128);
  });

  it("Returns length equal to given number length when object with value (number of a given length) is given as input", () => {
    let object = {partitionKey:30424926736102455666909511058783356528189825761268954763278114255735750460948858232037373362175135547009879073875536029648703285170771160475136662490148128142104170634335534802265628818471663886684209284784203789560435562082175930440074202}
    const trivialKey = deterministicPartitionKey(object);
    expect(trivialKey).not.toHaveLength(128);
  });

});



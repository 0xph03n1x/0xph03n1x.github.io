---
title: "Writeups for the whitebox challenges on trycrack.me"
date: "2023-08-30"
draft: false
identifier: "blog"
---

Huge thanks to the creator of [trycrack.me](https://trycrack.me) - [T A J R](https://twitter.com/xtajr) for providing an interesting platform for whitebox and blackbox crackmes.  
Code for all the completed challenged can be downloaded [here](https://github.com/0xph03n1x/trycrackme).

# "Start here"

Challenge code:

```python
your_input = ""

if your_input == "Hello_World":
	print("Good Job!")

else:
	print("Wrong Password")
```

Solution:  

The goal here is for the `your_input` variable to match the string it's being compared to, which is in clear text and not obfuscated.
Simply entering `Hello_World` will solve this challenge.

# "Pycimal"

Challenge code:

```python
your_input = ""
password = ""
intPass = "83,117,112,101,114,83,101,99,117,114,\
101,80,97,115,115,119,111,114,100,87,104,105,99,\
104,67,97,110,116,66,101,67,114,97,99,107,101,100,\
87,105,116,104,111,117,116,66,108,97,99,107,109,97,\
103,105,99"
 
intPass = intPass.split(",")
 
for c in intPass:
    password = password + chr(int(c))
    
if your_input == password:
    print("Good job!")
    
else:
    print("Wrong password")
```

Solution:  

This time the password is stored as a string that contains decimal number split by "," and then each number gets number converted from string to integer, and passed to the [chr()](https://docs.python.org/3/library/functions.html#chr) function.
The [chr()](https://docs.python.org/3/library/functions.html#chr) function will convert the int to a character, which is stored in the `password` string, that our input will be compared to.
Following script will provide the solution.

```python
password = ""
intPass = "83,117,112,101,114,83,101,99,117,114,\
101,80,97,115,115,119,111,114,100,87,104,105,99,\
104,67,97,110,116,66,101,67,114,97,99,107,101,100,\
87,105,116,104,111,117,116,66,108,97,99,107,109,97,\
103,105,99"
 
intPass = intPass.split(",")
 
for c in intPass:
    password = password + chr(int(c))

print(password)
```

# "EasySharp"

Challenge code:

```cs
string your_input = "";
char[] array = your_input.ToCharArray();
string[] array2 = new string[array.Length];
string enc = "";
string correct = "144260662546426066";

for (int i = 0; i < your_input.Length; i++)
{
    array2[i] = Convert.ToString((int)array[i] - 55);
    enc += array2[i];
}

if (enc == correct)
    Console.WriteLine("Good job!");
else
    Console.WriteLine("Wrong Answer!")
```

Soluiton:  

Another encoded flag, this time the encoded string, for every character in the input, `55` is being removed before the final check.
Given the final result, we can reverse the operation, adding `55` to each number and get the correct input.
The following script gets us the flag.

```python
flag = "144260662546426066"
solved = ''
# split the string on every second character
flag_list = [flag[i:i+2] for i in range(0, len(flag), 2)]
# for every item in the list, convert it from string to int, add 55, pass to chr() and concatanate to the `solved` string
for i in flag_list:
    solved += chr(int(i) + 55)
print(solved)
```

# "Replace"

Challenge code:

```php
$your_input = "";

$txt = str_replace("op","",$your_input);

if($txt === "reprop")
  echo ("Good job!");
else
  echo ("Wrong Answer!");
```

Solution:  

The challenge code looks for the `op` string in the user input and replaces it with nothing. It then checks if the resulting string matches `reprop`.
To get the flag here, since the `str_replace` function is only called once, we need to modify the input to include `op` between the `o` and `p`, which gives the solve.

# "Out of the box"

Challenge code:

```python
import pwn 
password= bytes.fromhex("3a2a2e1e3659113a5f1a3c335d1b1a3a2d590d031b5b064413")
your_input = "****" # hint: (4 characters)

enc_password = pwn.xor(password, your_input)

if "TCM{X0r_1s" in str(enc_password):
  print("Good Job!")
else:
  print("Wrong password")
```

Solution:  

The flag is a string of hex numbers that gets converted to a `bytes` object, that is then xor'ed with the supplied input. The resulting string is being checked for the existence of `TCM{X0r_1s` string inside of the results.
While there might be a more elegant solution I decided to create a small bruteforce setup (since we have a hint that the input is 4 characters) using the `pwn` and `itertools` python modules.
The following code will iterate over all possible 4-character long combinations, upon failure of the `if` check, will continue and if the correct input is found it will be printed along with the resulting flag.

```python
import pwn
import itertools
import string

password= bytes.fromhex("3a2a2e1e3659113a5f1a3c335d1b1a3a2d590d031b5b064413")
your_input = "****" # hint: (4 characters)

data_set_1 = list(string.ascii_lowercase)
data_set_2 = list(string.ascii_lowercase)
data_set_3 = list(string.ascii_lowercase)
data_set_4 = list(string.ascii_lowercase)

for permutation in itertools.product(data_set_1, data_set_2, data_set_3, data_set_4):
    #print(permutation)
    your_input = permutation

    enc_password = pwn.xor(password, your_input)

    if "TCM{X0r_1s" in str(enc_password):
        print(f"The correct input is: {your_input}")
        print(str(enc_password))
        print("Good Job!")
        break
    else:
        continue
```

# "Old cipher"

Challenge code:

```c
char your_input[7];
scanf("%s",your_input);

char* correct = "cr4ckme";

for (int i = 0 ; i < strlen(correct) ; i++)
{
    if (correct[i] - 1 != your_input[i]) {
	printf("Wrong Answer");
	return 1;
    }
}
printf("Good Job!");
```

Solution:  

The challenge uses a clear-text flag and iterates the characters in the input alongside the flag to check if the characters at the same position are equal to the character of `correct` minus one, i.e. the previous letter in the alphabet. For `c` that would be the letter `b` and so on.
Since C can treat a `char` as an integer a simple `-1` reverts to the character to the previous one.
The following code provide the complete solution, but this could also be done by hand.


```python
flag = "cr4ckme"
solution = ""

for c in flag:
    solution += chr(ord(c) - 1)

print(solution)
```

# "Do The Math"

Challenge code:

```python
your_input = ""
password = list(bytes(your_input,encoding='utf-8'))

check = (password[0] + 29 == 150) and (password[1] + 39 == 150) and (password[2] + 33 == 150)\
	and (password[3] + 105 == 150) and (password[4] + 47 == 150) and (password[5] + 39 == 150)\
	and (password[6] + 34 == 150) and (password[7] + 105 == 150) and (password[8] + 34 == 150)\
	and (password[9] + 46 == 150) and (password[10] + 49 == 150) and (password[11] + 105 == 150)\
	and (password[12] + 31 == 150) and (password[13] + 36 == 150) and (password[14] + 45 == 150)\
	and (password[15] + 34 == 150) and (password[16] + 49 == 150) and (password[17] + 105 == 150)\
	and (password[18] + 53 == 150) and (password[19] + 40 == 150) and (password[20] + 35 == 150)\
	and (password[21] + 31 == 150) and (password[22] + 49 == 150) and (password[23] + 36 == 150)

if (check == True):
	print("Good Job!")

else:
	print("Wrong Password")
```

Solution:  

The input get converted from utf-8 encoded string -> bytes -> list. Each element of the list has a seemingly random number added and is compared to a specific number.
Using some multi-line editing in your editor of choice you can extract the final and added value to get the original value.
There are two ways I found this challenge can be solved in python. The first one is create an empty list, fill it with `None` and then use the value for each index.
Alternatively use a list and appent at the character after subtracting. This only works since the check are done for each element in sequence.
The code below uses this method.

```python
password = []

password.append(chr(150 - 29))
password.append(chr(150 - 39))
password.append(chr(150 - 33))
password.append(chr(150 - 105))
password.append(chr(150 - 47))
password.append(chr(150 - 39))
password.append(chr(150 - 34))
password.append(chr(150 - 105))
password.append(chr(150 - 34))
password.append(chr(150 - 46))
password.append(chr(150 - 49))
password.append(chr(150 - 105))
password.append(chr(150 - 31))
password.append(chr(150 - 36))
password.append(chr(150 - 45))
password.append(chr(150 - 34))
password.append(chr(150 - 49))
password.append(chr(150 - 105))
password.append(chr(150 - 53))
password.append(chr(150 - 40))
password.append(chr(150 - 35))
password.append(chr(150 - 31))
password.append(chr(150 - 49))
password.append(chr(150 - 36))

print(''.join(password))
```

# "XOR magic"

Challenge code:

```python
your_input = ""
arr = [23,49,58,27,44,49,14,38,10,37,26,44,54,0,34,45]
c = 0

if len(your_input) != 16 or "Xor" not in your_input:
    exit("Wrong Input")

for i in your_input:
    check = ord(i) ^ ord(your_input[13])
    
    if(check == arr[c]):
        print("Good Job!")
    else:
        exit("Wrong Answer")

    c += 1
```

Solution:  

The input is checked whether its length is 16 characters and that it contains the string `Xor`. Each character in the input is then xor'ed with the 14th character (index 13) and is matched against each element in `arr`.
Since we have the result of the xor operations, we can reverse the operation and get the flag, we just need to xor the elements in the `arr` array and check for the presence of "Xor" in the resulting string.
The following script iterate in the range between 0 and 255 (ASCII table + extended codes) and checks for "Xor" in the resulting string to get the flag.

```python
your_input = ""

arr = [23,49,58,27,44,49,14,38,10,37,26,44,54,0,34,45]
c = 0

# X = 88
# o = 111
# r = 114
test = ""

for i in range(0, 255):
    for j in range(len(arr)):
        test += (chr(i ^ arr[j]))
    if "Xor" in test:
        print(f"Correct result is: {test}")
    test = ""

if len(your_input) != 16 or "Xor" not in your_input:
    exit("Wrong Input")

for i in your_input:
    check = ord(i) ^ ord(your_input[13])
    if(check == arr[c]):
        print("Good Job!")
    else:
        exit("Wrong Answer")

    c += 1
```

# "Mom and Dad"

Challenge code:

```c
char your_input[9] = "";

int j, i = 0;
char Baby[9], DAD[] = "zlBnSaoO24GeliI", MOM[] = "dYbWqlL8wsSk5jfduU8";

if (strlen(your_input) != 9 || your_input[0] != DAD[4])
{
    printf("Wrong Input");
    exit(0);
}

for (j = 8; j >= 0; j--)
{
    Baby[i] = your_input[j];
    i++;
}

Baby[j] = '\0';
if ((Baby[0] == MOM[9]) && (Baby[7] == DAD[3]) && (Baby[1] == MOM[5]) && (Baby[6] == DAD[6]) && (Baby[2] == DAD[1]) && (Baby[5] == MOM[8]) && (Baby[3] == DAD[5]) && (Baby[4] == MOM[2]))
{
        printf("Good Job!");
}
else
{
    printf("Wrong Answer");
}
```

Solution:  

The challenge checks if the length of the input is 9 characters and if the first character is equal to the fith char in the DAD[] array - `DAD[4]` (it being "S").
To get the rest of the flag we can modify to assign (based on the other checks) to an empty char array, compile the program and run. With some help from python to reverse the string.

```c
#include <stdio.h>

int main(){
    char your_input[9] = "Snowballs";
    // char flag[9];

    int j, i = 0;
    char Baby[9], DAD[] = "zlBnSaoO24GeliI", MOM[] = "dYbWqlL8wsSk5jfduU8";
    printf("%d\n", strlen(your_input));
    if (strlen(your_input) != 9 || your_input[0] != DAD[4])
    {
        printf("Wrong Input");
        exit(0);
    }

    for (j = 8; j >= 0; j--)
    {
        Baby[i] = your_input[j];
        i++;
    }
    printf("%s\n", Baby);
    Baby[j] = '\0';
    if ((Baby[0] == MOM[9]) && (Baby[7] == DAD[3]) && (Baby[1] == MOM[5]) && (Baby[6] == DAD[6]) && (Baby[2] == DAD[1]) && (Baby[5] == MOM[8]) && (Baby[3] == DAD[5]) && (Baby[4] == MOM[2]))
    {
            printf("Good Job!");
    }
    else
    {
        printf("Wrong Answer");
    }
    // flag[0] = MOM[9]; 
    // flag[1] = MOM[5]; 
    // flag[2] = DAD[1]; 
    // flag[3] = DAD[5]; 
    // flag[4] = MOM[2]; 
    // flag[5] = MOM[8]; 
    // flag[6] = DAD[6]; 
    // flag[7] = DAD[3];

    // printf("\n%s\n", flag);
    // Results - sllabwon (reverse in python [::-1] give nowballs)
    // First letter should be - S
    // 
}
```

# "Find my secret"

Challenge code:

```python
import base64

your_input = ""

def decode(x):
    decoded = base64.b64decode(x)
    decoded = decoded.decode("utf-8")
    
    password = ""
    for c in decoded:
        password += chr(ord(c) ^ 0x55)
    
    return password

try:
   if decode(your_input) == "mysecret":
       print("Good Job!")
   else:
      print("Wrong password")
except:
   print("Please enter correct Base64 data")
```

Solution:  

To satisfy the requirements of the challenge we need to supply a base64 encoded input, each character of which will be xor'ed with 0x55, the result should match the "mysecret" string.
We can modify the code, buy adding a flag() function that imitates the decode() function, pass it the "mysecret" string and perform the same operations.
The script below prints the flag.


```python
import base64

your_input = ""

def decode(x):
    decoded = base64.b64decode(x)
    decoded = decoded.decode("utf-8")
    
    password = ""
    for c in decoded:
        password += chr(ord(c) ^ 0x55)
    
    return password

def flag(x):

    password = ""
    for c in x:
        password += chr(ord(c) ^ 0x55)
    
    flag_bytes = password.encode('utf-8')
    flag = base64.b64encode(flag_bytes)
    
    print(f"Flag: {flag}")

try:
   if decode(your_input) == "mysecret":
       print("Good Job!")
   else:
      print("Wrong password")
except:
   print("Please enter correct Base64 data")

flag("mysecret")
```

# "Vault1"

Challenge code:

```java

                                
//This Challenge was taken from picoCTF
import java.util.*;

class VaultDoor1 {
    public static void main(String args[]) {
        VaultDoor1 vaultDoor = new VaultDoor1();
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter vault password: ");
	String userInput = scanner.next();
	String input = userInput.substring("picoCTF{".length(),userInput.length()-1);
	if (vaultDoor.checkPassword(input)) {
	    System.out.println("Access granted.");
	} else {
	    System.out.println("Access denied!");
	}
    }

    // I came up with a more secure way to check the password without putting
    // the password itself in the source code. I think this is going to be
    // UNHACKABLE!! I hope Dr. Evil agrees...
    //
    // -Minion #8728
    public boolean checkPassword(String password) {
        return password.length() == 32 &&
               password.charAt(0)  == 'd' &&
               password.charAt(29) == 'a' &&
               password.charAt(4)  == 'r' &&
               password.charAt(2)  == '5' &&
               password.charAt(23) == 'r' &&
               password.charAt(3)  == 'c' &&
               password.charAt(17) == '4' &&
               password.charAt(1)  == '3' &&
               password.charAt(7)  == 'b' &&
               password.charAt(10) == '_' &&
               password.charAt(5)  == '4' &&
               password.charAt(9)  == '3' &&
               password.charAt(11) == 't' &&
               password.charAt(15) == 'c' &&
               password.charAt(8)  == 'l' &&
               password.charAt(12) == 'H' &&
               password.charAt(20) == 'c' &&
               password.charAt(14) == '_' &&
               password.charAt(6)  == 'm' &&
               password.charAt(24) == '5' &&
               password.charAt(18) == 'r' &&
               password.charAt(13) == '3' &&
               password.charAt(19) == '4' &&
               password.charAt(21) == 'T' &&
               password.charAt(16) == 'H' &&
               password.charAt(27) == '6' &&
               password.charAt(30) == 'f' &&
               password.charAt(25) == '_' &&
               password.charAt(22) == '3' &&
               password.charAt(28) == 'd' &&
               password.charAt(26) == 'f' &&
               password.charAt(31) == '4';
    }
}
```

Solution:  

This time in java, the challenge will check for specific character in different (unlike "XOR magic" challenge this is not done sequentially).
We can use the method mentioned previously, by create an array and filling it with `None`s and performing the corresponding substitutions, then printing the flag.

```python
password = [None] * 32

password[0] = 'd'
password[29] = 'a'
password[4] = 'r'
password[2] = '5'
password[23] = 'r'
password[3] = 'c'
password[17] = '4'
password[1] = '3'
password[7] = 'b'
password[10] = '_'
password[5] = '4'
password[9] = '3'
password[11] = 't'
password[15] = 'c'
password[8] = 'l'
password[12] = 'H'
password[20] = 'c'
password[14] = '_'
password[6] = 'm'
password[24] = '5'
password[18] = 'r'
password[13] = '3'
password[19] = '4'
password[21] = 'T'
password[16] = 'H'
password[27] = '6'
password[30] = 'f'
password[25] = '_'
password[22] = '3'
password[28] = 'd'
password[26] = 'f'
password[31] = '4'

print("picoCTF{{{}}}".format(''.join(password)))
```

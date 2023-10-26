class RabinKarp:
    def __init__(self, text, pattern):
        self.text = text
        self.pattern = pattern
        self.text_length = len(text)
        self.pattern_length = len(pattern)
        self.hash_value = 0
        self.pattern_hash_value = 0
        self.window = []
        self.base = 256 
        self.prime = 101 
        self.occurrences = []
    def calculate_hash_value(self, string, length):
        value = 0
        for i in range(length):
            value = (self.base * value + ord(string[i])) % self.prime
        return value
    def recalculate_hash_value(self, old_hash, old_char, new_char):
        new_hash = (self.base * (old_hash - ord(old_char) * (self.base **(self.pattern_length - 1))) + ord(new_char)) % self.prime
        return new_hash
    def search_pattern(self):
        self.pattern_hash_value = self.calculate_hash_value(self.pattern,
        self.pattern_length)
        self.hash_value = self.calculate_hash_value(self.text, self.pattern_length)
        pattern_found = False 
        for i in range(self.text_length - self.pattern_length + 1):
            if self.pattern_hash_value == self.hash_value:
                for j in range(self.pattern_length):
                    if self.text[i + j] != self.pattern[j]:
                        break
                else:
                    print(f"Pattern found at index {i}")
                    self.occurrences.append(i)
                    pattern_found = True
            if i < self.text_length - self.pattern_length:
                self.hash_value = self.recalculate_hash_value(self.hash_value, self.text[i], self.text[i + self.pattern_length])
        if not pattern_found:
            print("Pattern not found in the text.")
        return len(self.occurrences)

def rabin_karp(text, pattern):
    rk_search = RabinKarp(text, pattern)
    return rk_search.search_pattern()


def naive_string_matching(text, pattern):
    n = len(text)
    m = len(pattern)
    occurrences = [] 
    for i in range(n - m + 1):
        if text[i:i+m] == pattern:
            occurrences.append(i)
    return len(occurrences)

def compute_prefix_function(pattern):
    m = len(pattern)
    pi = [0] * m
    j = 0
    for i in range(1, m):
        while j > 0 and pattern[i] != pattern[j]:
            j = pi[j-1]
        if pattern[i] == pattern[j]:
            j += 1
        pi[i] = j
    return pi

def kmp_search(text, pattern):
    n = len(text)
    m = len(pattern)
    pi = compute_prefix_function(pattern)
    j = 0 
    occurrences = []
    for i in range(n):
        while j > 0 and text[i] != pattern[j]:
            j = pi[j-1] 
        if text[i] == pattern[j]:
            j += 1 
        if j == m: 
            occurrences.append(i - m + 1)
            j = pi[j-1] 
    return len(occurrences)


class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
        
class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    

class SuffixTree:
    def __init__(self, text):
        self.text = text
        self.trie = Trie()
        self.build()
    def build(self):
        for i in range(len(self.text)):
            self.trie.insert(self.text[i:])
    def display(self, node=None, prefix=''):
        node = node or self.trie.root
        if not node.children:
            print(prefix)
        else:
            for char, child in node.children.items():
                self.display(child, prefix + char)

                
                
                
def suffix_tree(text, pattern):
    print("Invoked Suffix Tree")
    suffix_tree = SuffixTree(text)
    occurrences = suffix_tree.search(pattern)
    return len(occurrences) 
                
def construct_suffix_array(text):
    suffixes = [(text[i:], i) for i in range(len(text))]
    suffixes.sort(key=lambda x: x[0])
    suffix_array = [item[1] for item in suffixes]
    return suffix_array

def search_pattern_with_suffix_array(text, pattern, suffix_array): #Using bst against suffix array
    n = len(text)
    m = len(pattern)
    left, right = 0, n - 1
    positions = []
    while left <= right:
        mid = (left + right) // 2
        suffix = suffix_array[mid]
        if text[suffix:suffix + m] == pattern:
            positions.append(suffix)
            i = mid - 1
            while i >= left and text[suffix_array[i]:suffix_array[i] + m] == pattern:
                positions.append(suffix_array[i])
                i -= 1
            i = mid + 1
            while i <= right and text[suffix_array[i]:suffix_array[i] + m] == pattern:
                positions.append(suffix_array[i])
                i += 1
            return positions
        elif text[suffix:suffix + m] < pattern:
            left = mid + 1
        else:
            right = mid - 1
    return positions

def suffix_array(text, pattern):
    print("Invoked Suffix Array")
    suffix_array_structure = construct_suffix_array(text)
    occurrences = search_pattern_with_suffix_array(text, pattern, suffix_array_structure)
    return len(occurrences)
    

import time
def get_keywords(algo_choice, scrapped_content):
    keywords_and_count = []
    existing_keywords = []
    start_time = time.time()
    for eachword in scrapped_content.split(" "):
        if eachword == "":
            continue
        elif not eachword.isalpha():
            continue
        else:
            if eachword not in existing_keywords:
                keywords_and_count.append({"keyword": eachword, "count": eval(f"{algo_choice}(scrapped_content, eachword)")})
                existing_keywords.append(eachword)
    return keywords_and_count, time.time() - start_time

if __name__ == "__main__":
    print(get_keywords("suffix_tree", "hello this the i am the pokemon the poki"))
    # # Suffix Array
    # text = input("Enter the text: ")
    # suffix_array = construct_suffix_array(text)
    # print("Suffix Array:", suffix_array)
    
    # # Suffix Tree
    # text = input("Enter the text: ")
    # suffix_tree = SuffixTree(text)
    # suffix_tree.display()
    
    # # Rabin-Karp
    # text = input("Enter the text: ")
    # pattern = input("Enter the pattern: ")
    # rk_search = RabinKarp(text, pattern)
    # print(rk_search.search_pattern())
    
    

    # # Naive String Matching
    # text = input("Enter the text: ")
    # pattern = input("Enter the pattern: ")
    # occurrences = naive_string_matching(text, pattern)
    # if occurrences:
    #     print(f'Pattern found at indices: {occurrences}')
    # else:
    #     print('Pattern not found in the text.')
    
    # # KMP
    # text = input("Enter the text: ")
    # pattern = input("Enter the pattern: ")
    # # Find and display occurrences
    # occurrences = kmp_search(text, pattern)
    # if occurrences:
    #     print(f'Pattern found at indices: {occurrences}')
    # else:
    #     print('Pattern not found in the text.')
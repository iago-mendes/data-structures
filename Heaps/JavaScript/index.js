const rl = require('readline').createInterface({
	input: process.stdin
})

class Heap {
	// data: number[]

	constructor() {
		this.data = []
	}

	/**
	 * 
	 * @param {number} num 
	 */
	insert(num) {
		this.data.push(num)
		let index = this.data.length - 1

		let parentIndex = this.getParentIndex(index)
		while (index > 0 && this.data[parentIndex] < num) {
			this.swap(index, parentIndex)

			index = parentIndex
			parentIndex = this.getParentIndex(index)
		}
	}

	/**
	 * 
	 * @param {number} firstIndex 
	 * @param {number} secondIndex 
	 */
	swap(firstIndex, secondIndex) {
		const tmp = this.data[firstIndex]
		this.data[firstIndex] = this.data[secondIndex]
		this.data[secondIndex] = tmp
	}

	/**
	 * 
	 * @param {number} index 
	 * @return {number}
	 */
	getParentIndex(index) {
		if (index % 2 === 0)
			return index / 2 - 1
		
		return Math.floor(index / 2)
	}

	/**
	 * 
	 * @param {number} index 
	 * @return {number}
	 */
	 getLeftChildIndex(index) {
		return 2 * index + 1
	}

	/**
	 * 
	 * @param {number} index 
	 * @return {number}
	 */
	 getRightChildIndex(index) {
		return 2 * index + 2
	}

	/**
	 * @return {string}
	 */
	toString() {
		const size = this.data.length
		
		// root
		let index = 0
		let levelLength = 1
		let levelByLevel = `${this.data[0]}\n`
		
		while (index < size) {
			levelLength *= 2
			const maxIndex = index + levelLength
			const level = []

			index++
			

			while (index < size && index <= maxIndex) {
				level.push(this.data[index])

				if (index !== maxIndex)
					index++
				else
					break
			}

			levelByLevel += level.join(' ') + '\n'
		}

		return levelByLevel
	}
}

rl.question('', input => {
	const nums = input.split(' ').map(n => Number(n))

	const heap = new Heap()
	nums.forEach(num => heap.insert(num))

	console.log(heap.toString())
	rl.close()
})

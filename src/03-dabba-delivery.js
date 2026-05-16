/**
 * 🍱 Mumbai ka Dabbawala Service - ES6 Classes
 *
 * Mumbai ke famous dabbawala system ko ab modern ES6 class mein likho!
 * Har din hazaaron dabbas deliver hote hain aur ek bhi galat nahi jaata.
 * Tumhe DabbaService class banana hai jo customers manage kare, delivery
 * batches banaye, aur daily reports generate kare.
 *

 *

 *
 
 *


 *
 *   getCustomer(name)
 *     - Returns customer object by name (including inactive)
 *     - Returns null if not found
 *
 * Rules:
 *   - Use ES6 class syntax (not constructor functions)
 *   - Customer ids auto-increment starting from 1
 *   - No duplicate customer names allowed
 *   - removeCustomer is a soft delete (active: false), not actual removal
 *   - getDailyReport only counts active customers
 *   - mealPreference must be exactly "veg", "nonveg", or "jain"
 *
 * @example
 *   const service = new DabbaService("Raju Dabba", "Dadar");
 *   service.addCustomer("Amit", "Andheri West", "veg");
 *   // => { id: 1, name: "Amit", address: "Andheri West", mealPreference: "veg", active: true, delivered: false }
 *   service.addCustomer("Priya", "Bandra East", "jain");
 *   // => { id: 2, ... }
 *   service.createDeliveryBatch();
 *   // => [{ customerId: 1, name: "Amit", ... }, { customerId: 2, name: "Priya", ... }]
 *   service.markDelivered(1);       // => true
 *   service.getDailyReport();
 *   // => { totalCustomers: 2, delivered: 1, pending: 1, mealBreakdown: { veg: 1, nonveg: 0, jain: 1 } }
 */


//  * Class: DabbaService
//  *
//  *   constructor(serviceName, area)
//  *     - this.serviceName = serviceName
//  *     - this.area = area
//  *     - this.customers = [] (internal array)
//  *     - this._nextId = 1 (auto-increment counter)
//  *
//  *   addCustomer(name, address, mealPreference)
//  *     - mealPreference must be one of: "veg", "nonveg", "jain"
//  *     - Agar invalid preference, return null
//  *     - Agar name already exists (duplicate), return null
//  *     - Creates customer: { id: auto-increment, name, address, mealPreference,
//  *       active: true, delivered: false }
//  *     - Pushes to this.customers
//  *     - Returns the customer object

export class DabbaService {
  constructor(serviceName, area) {
    constructor(serviceName, area)
    this.serviceName = serviceName
    this.area = area
    this.customers = []
    this._nextId = 1
  }

  addCustomer(name, address, mealPreference) {
    if (this.customers.some((item) => item.name === name)) {
      return null
    }
    if (mealPreference === "veg" | mealPreference === "nonveg" | mealPreference === "jain") {
      const customer = {
        id: this._nextId,
        name,
        address,
        mealPreference,
        active: true,
        delivered: false
      }
      this._nextId++
      this.customers.push(customer)
      return customer

    } else {
      return null
    }
    // Your code here
  }
  //  *   removeCustomer(name)
  //  *     - Sets customer's active to false (soft delete)
  //  *     - Returns true if found and deactivated
  //  *     - Returns false if not found or already inactive
  removeCustomer(name) {

    let customer = this.customers.find(c => c.name === name);

    if (!customer || customer.active === false) {
      return false;
    }

    customer.active = false;
    return true;

  }
  // *   createDeliveryBatch()
  //  *     - Returns array of delivery objects for all ACTIVE customers
  //  *     - Each delivery: { customerId: id, name, address, mealPreference,
  //  *       batchTime: new Date().toISOString() }
  //  *     - Resets delivered to false for all active customers before creating batch
  //  *     - Returns empty array if no active customers
  createDeliveryBatch() {

    let activeCustomers = this.customers.filter(c => c.active === true);

    if (activeCustomers.length === 0) {
      return []
    }
    activeCustomers.forEach(c => {
      c.delivered = false;
    });
    return activeCustomers.map((i) => (
      {
        customerId: i.id,
        name: i.name,
        address: i.address,
        mealPreference: i.mealPreference,
        batchTime: new Date().toISOString()
      }
    ))
  }

  //  *   markDelivered(customerId)
  //  *     - Finds active customer by id, sets delivered to true
  //  *     - Returns true if found and marked
  //  *     - Returns false if not found or not active
  //  *

  markDelivered(customerId) {
    let customer = this.customers.find(c => c.id === customerId && c.active);

    if (!customer) {
      return false;
    }

    customer.delivered = true;
    return true;

    // Your code here
  }


  //  *   getDailyReport()
  //  *     - Returns report object for ACTIVE customers only:
  //  *       {
  //  *         totalCustomers: number (active only),
  //  *         delivered: number (active and delivered === true),
  //  *         pending: number (active and delivered === false),
  //  *         mealBreakdown: { veg: count, nonveg: count, jain: count }
  //  *       }
  //  *     - mealBreakdown counts active customers only


  getDailyReport() {

    let activeCustomers = this.customers.filter(c => c.active === true);

    let delivered = activeCustomers.filter((item) => item.delivered === true).length
    let pending = activeCustomers.filter((item) => item.delivered === false).length
    let veg = activeCustomers.filter((item) => item.mealPreference === "veg").length
    let nonveg = activeCustomers.filter((item) => item.mealPreference === "nonveg").length
    let jain = activeCustomers.filter((item) => item.mealPreference === "jain").length


    return {
      totalCustomers: activeCustomers.length,
      delivered,
      pending,
      mealBreakdown: { veg, nonveg, jain }
    }
    // Your code here
  }

  //  *   getCustomer(name)
  //  *     - Returns customer object by name (including inactive)
  //  *     - Returns null if not found


  getCustomer(name) {

    let namee = this.customers.find((item) => item.name === name)
    if (namee) {

      return namee
    } else {
      return null
    }

  }
}

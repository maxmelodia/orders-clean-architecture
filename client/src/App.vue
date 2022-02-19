<template>
  <div>
    <div class="row">
      <div class="col-md-7">
        <div class="items">
          <div class="row">            
            <div class="col-md-4" v-for="item in items" v-bind:key="item.id">
              <div class="card card-body text-center">            
                <h5>{{item.description}}</h5>
                <h5>{{formatMoney(item.price)}}</h5>
                <br/>
                <button class="btn btn-primary btn-sm" @click="addItem(item)">Buy</button>
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  
      <div class="col-md-5">
        <div class="order">
          <div v-if="!newOrder.code">
            <div v-for="orderItem in order.orderItems" v-bind:key="orderItem.idItem">
              <div class="row orderItem">
                <div class="col-md-2">
                  {{orderItem.quantity}}
                </div>  
                <div class="col-md-4">
                  {{orderItem.item.description}}
                </div>  
                <div class="col-md-2">
                  {{formatMoney(orderItem.item.price * orderItem.quantity)}}
                </div>  
                <div class="col-md-4 text-right">
                  <button class="btn btn-primary btn-sm" @click="removeItem(orderItem.item)"><span class="fa fa-minus"></span></button>
                </div>
              </div>            
            </div>
            <hr/>
            <h5>Total: {{formatMoney(order.total)}}</h5>
            <br/>
            <div class="row">          
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="order.cpf" placeholder="CPF"/>
              </div>
              <div class="col-md-2">
                <button class="btn btn-primary btn-sm" @click="confirm(order)">Confirm</button>          
              </div>
              <br/>
            </div>
          </div>
          <div v-if="newOrder.code">
            <div class="text-center">
                <span class="fa fa-check fa-4x"></span>
                <br/>
                <br/>
                <h5>Order Confirmed</h5>
                <h6>{{newOrder.code}}</h6>
            </div>
          </div>
        </div>  
      </div>  
    </div>  
  </div>
</template>

<script>
import OrderService from "./services/OrderService";
import AxiosAdapter from "./infra/AxiosAdapter";
import MoneyService from "./services/MoneyService";

export default {
  name: 'App',
  data() {
    return {
      items: [], 
      order: {
        cpf:"056.438.546-86",
        orderItems: [],
        total: 0
      },
      newOrder: {}
    }
  },
  methods: {
    formatMoney (amount) {
      return MoneyService.formatMoney(amount);
    },
  },
  async created() {
    new OrderService(new AxiosAdapter(), this);
    this.getItems();
  }
}
</script>
<style>
.items {
  padding: 20px;
}

.order {
  background-color: #CCC;
  padding: 20px;
  min-height: 100vh;
}

.orderItem {
  margin-bottom: 10px;
}

.text-right {
  text-align: right;
}

</style>

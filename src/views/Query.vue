<template>
  <div class="bg-light p-2">
    <p>Please provid your query, e.g., accession=SAMN07212048</p>
    <form class="form-inline mt-1" >
      <label for="attribute" class="mr-sm-2 mb-2">Attribute:</label>
      <select class="custom-select mr-sm-2 mb-2" id="attribute">
        <option selected="">Choose...</option>
        <option value="accession">Accession</option>
        <option value="domain">Domain</option>
        <option value="name">Name</option>
        <option value="release">Release</option>
        <option value="update">Update</option>
      </select>
      
      <label class="my-1 mr-2 mb-2" for="equation">Equation</label>
      <select class="custom-select mr-sm-2 mb-2" id="equation">
        <option selected="">Choose...</option>
        <option value=">">></option>
        <option value="<"><</option>
        <option value="=">=</option>
      </select>        
        
      <label for="value" class="mr-sm-2 mb-2">Value:</label>
      <input type="text" class="form-control mb-2 mr-sm-2" id="value" placeholder="value" />

      <button type="button" class="btn mb-2" v-model="val" @click="addToList">Add</button>
        
      <button type="button" class="btn btn-primary mb-2 ml-3" @click="searchSample">Submit</button>
    </form>

    <div>
      <ul>
        <li v-for="(val,index) in values">
          {{val.val}}
          <img src="../assets/delete.png" @click="removeList(index)"/>
        </li>
      </ul>
    </div>

    <hr />
    
    <div  class="media-body col-sm-10 sampleDiv">
      <h3>The total found samples is {{pages.totalElements}}</h3>
      <div v-for="sample in messages" class="single-sample">
        <div class="mybg row ">
          <div class="col-sm-1" style="background-color:lavender;">Accession</div>
          <div class="col-sm-3" style="background-color:lavenderblush;">{{sample.accession}}</div>
          <div class="col-sm-1" style="background-color:lavender;">Domain</div>
          <div class="col-sm-3" style="background-color:lavenderblush;">{{sample.domain}}</div>
          <div class="col-sm-1" style="background-color:lavender;">Name</div>
          <div class="col-sm-3" style="background-color:lavenderblush;">{{sample.name}}</div>
        </div>
        <div class="mybg row ">
          <div class="col-sm-1" style="background-color:lavender;">Release</div>
          <div class="col-sm-5" style="background-color:lavenderblush;">{{sample.release}}</div>
          <div class="col-sm-1" style="background-color:lavender;">Update</div>
          <div class="col-sm-5" style="background-color:lavenderblush;">{{sample.update}}</div>
        </div>    
      </div>
    </div>

  </div>

</template>

<script>

  export default{
    name: 'query',

    data: () => ({
      API_URL:"https://www.ebi.ac.uk/biosamples/samples?text=",
      query:"",
      val: "1",
      values: [],
      messages:[],
      message:{
        accession:"",
        domain:"",
        name:"",
        release:"",
        releaseDate:"",
        update:"",
        updateDate:""
      },
      pages:[],
      error:""
    }),

    methods:{
      addToList: function () {
        this.query=$("#attribute").val()+$("#equation").val()+$("#value").val();

        var val = parseInt(this.val.trim());  
        if (val) {
          this.values.push({val: this.query});
        }
        this.val = String(val + 1);
      },
      removeList: function (index) {
        this.values.splice(index, 1);
      },

      searchSample(){      
        if($("#attribute").val()=='accession'){
          this.API_URL="https://www.ebi.ac.uk/biosamples/samples?text="+$("#value").val();
        }
        
        fetch(this.API_URL,{
          method:'GET'
        }).then(response => response.json()).then(result => {
          if (result.details){
            //there was an error
            const error = result.details.map(detail => detail.message).join();
            console.log(error);
            this.error = error;
          } else {
            this.error='';
            this.messages=result._embedded.samples;
            this.pages=result.page;
          }
        });
		  }
    }
    
  }  
  
  
  
</script>

<style>
  input, select, option {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  input, select {
    height:31px;
    border : 1px #ccc solid;
    vertical-align:top;
  }
  input{
    width:200px;
  }
  select{
    width:40px;
  }

	.sampleDiv{
		padding:20px;
		margin:0 auto;
		box-sizing:border-box;
		background:#eee;
	}
	.single-sample{
		padding:5px;
		margin:10px 0;
		box-sizing:border-box;
		background:#eee;
	} 
 .row > div {
    outline: 2px solid #ccc;

 }

</style>

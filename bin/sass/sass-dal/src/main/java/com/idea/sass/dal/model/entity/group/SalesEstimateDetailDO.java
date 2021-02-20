package com.idea.sass.dal.model.entity.group;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.util.Map;
import java.util.Date;

/**
 * @author jmvn-cli
 **/
@TableName(value = "sales_estimate_detail", autoResultMap = true)
public class SalesEstimateDetailDO implements Serializable {

    private static final long serialVersionUID = 1L;
    
   /**
    * 
    **/
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    public Long id;
    
   /**
    * 销售预估Id
    **/
    public Long salesEstimateId;
    
   /**
    * 商品配置Id
    **/
    public Long goodsDeployId;
    
   /**
    * 渠道编码(apollo)
    **/
    public String channelCode;
    
   /**
    * 仓库Id
    **/
    public Long warehouseId;
    
   /**
    * 预估月份数据, 例：[{&#34;year&#34;:2020,&#34;month&#34;:6,&#34;totalNum&#34;:15,&#34;inventoryNum&#34;:15,&#34;salesPrice&#34;:15.25}]
    **/
    public Map monthData;
    
   /**
    * 逻辑删除 0否 1是   默认0
    **/
    public Integer delFlag;
    
   /**
    * 创建时间
    **/
    public Date gmtCreate;
    
   /**
    * 创建人Id
    **/
    public Long createrId;
    
   /**
    * 更新时间
    **/
    public Date gmtModify;
    
   /**
    * 修改人Id
    **/
    public Long modifierId;
    
   
   /**
    * @param id 
    **/
    public void setId(Long id){
        this.id = id;
    }

   /**
    * @return Long 
    **/
    public Long getId(){
        return id;
    }
   
   /**
    * @param salesEstimateId 销售预估Id
    **/
    public void setSalesEstimateId(Long salesEstimateId){
        this.salesEstimateId = salesEstimateId;
    }

   /**
    * @return Long 销售预估Id
    **/
    public Long getSalesEstimateId(){
        return salesEstimateId;
    }
   
   /**
    * @param goodsDeployId 商品配置Id
    **/
    public void setGoodsDeployId(Long goodsDeployId){
        this.goodsDeployId = goodsDeployId;
    }

   /**
    * @return Long 商品配置Id
    **/
    public Long getGoodsDeployId(){
        return goodsDeployId;
    }
   
   /**
    * @param channelCode 渠道编码(apollo)
    **/
    public void setChannelCode(String channelCode){
        this.channelCode = channelCode;
    }

   /**
    * @return String 渠道编码(apollo)
    **/
    public String getChannelCode(){
        return channelCode;
    }
   
   /**
    * @param warehouseId 仓库Id
    **/
    public void setWarehouseId(Long warehouseId){
        this.warehouseId = warehouseId;
    }

   /**
    * @return Long 仓库Id
    **/
    public Long getWarehouseId(){
        return warehouseId;
    }
   
   /**
    * @param monthData 预估月份数据, 例：[{&#34;year&#34;:2020,&#34;month&#34;:6,&#34;totalNum&#34;:15,&#34;inventoryNum&#34;:15,&#34;salesPrice&#34;:15.25}]
    **/
    public void setMonthData(Map monthData){
        this.monthData = monthData;
    }

   /**
    * @return Map 预估月份数据, 例：[{&#34;year&#34;:2020,&#34;month&#34;:6,&#34;totalNum&#34;:15,&#34;inventoryNum&#34;:15,&#34;salesPrice&#34;:15.25}]
    **/
    public Map getMonthData(){
        return monthData;
    }
   
   /**
    * @param delFlag 逻辑删除 0否 1是   默认0
    **/
    public void setDelFlag(Integer delFlag){
        this.delFlag = delFlag;
    }

   /**
    * @return Integer 逻辑删除 0否 1是   默认0
    **/
    public Integer getDelFlag(){
        return delFlag;
    }
   
   /**
    * @param gmtCreate 创建时间
    **/
    public void setGmtCreate(Date gmtCreate){
        this.gmtCreate = gmtCreate;
    }

   /**
    * @return Date 创建时间
    **/
    public Date getGmtCreate(){
        return gmtCreate;
    }
   
   /**
    * @param createrId 创建人Id
    **/
    public void setCreaterId(Long createrId){
        this.createrId = createrId;
    }

   /**
    * @return Long 创建人Id
    **/
    public Long getCreaterId(){
        return createrId;
    }
   
   /**
    * @param gmtModify 更新时间
    **/
    public void setGmtModify(Date gmtModify){
        this.gmtModify = gmtModify;
    }

   /**
    * @return Date 更新时间
    **/
    public Date getGmtModify(){
        return gmtModify;
    }
   
   /**
    * @param modifierId 修改人Id
    **/
    public void setModifierId(Long modifierId){
        this.modifierId = modifierId;
    }

   /**
    * @return Long 修改人Id
    **/
    public Long getModifierId(){
        return modifierId;
    }
   
    @Override
    public String toString() {
        return "SalesEstimateDetailDO{" +
          ",id=" + this.id + 
          ",salesEstimateId=" + this.salesEstimateId + 
          ",goodsDeployId=" + this.goodsDeployId + 
          ",channelCode=" + this.channelCode + 
          ",warehouseId=" + this.warehouseId + 
          ",monthData=" + this.monthData + 
          ",delFlag=" + this.delFlag + 
          ",gmtCreate=" + this.gmtCreate + 
          ",createrId=" + this.createrId + 
          ",gmtModify=" + this.gmtModify + 
          ",modifierId=" + this.modifierId + 
        "}";
    }
}
